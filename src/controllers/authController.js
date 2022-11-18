import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../db.js';

export async function signUp(req, res) {
    try {
        const user = req.body;

        const passwordHash = bcrypt.hashSync(user.password, 10);
      
        await db.collection('users').insertOne({ ...user, password: passwordHash })
      
        res.sendStatus(201);
    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {
}