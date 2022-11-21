import userModel from "../models/userModel.js";

export function userModelValidationMiddleware(req, res, next) {
    const user = req.body;

    const validation = userModel.validate(user, { abortEarly: true });
    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}