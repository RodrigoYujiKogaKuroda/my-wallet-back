import bcrypt from 'bcrypt';
import { usersCollection, sessionsCollection } from "../database/db.js";
import { v4 as uuid } from 'uuid';
import e from 'cors';

export async function signUp(req, res) {
    let user = req.body;

    const users = await usersCollection.find().toArray();
    if (users.some(e => e.email === user.email)) {
        res.sendStatus(409);
    } else {
        try {
            const passwordHash = bcrypt.hashSync(user.password, 10);
            user = {
                name: user.name,
                email: user.email,
                password: passwordHash
            }
            await usersCollection.insertOne({ ...user });
            res.sendStatus(201);
        } catch(err) {
            console.error(err);
            res.sendStatus(500);
        }
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;
    const token = uuidV4();

    try {
        const userExists = await usersCollection.findOne({ email });
        await sessionsCollection.insertOne({
            token,
            userId: userExists._id,
        });
        res.send({ token });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}