import userModel from "../models/userModel.js";

export function schemaValidationMiddleware(req, res, next) {
    const user = req.body;

    const validation = userModel.validate(user);
    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}