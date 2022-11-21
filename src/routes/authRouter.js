import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import { userModelValidationMiddleware } from '../middlewares/userModelValidationMiddleware.js';

const authRouter = Router();
authRouter.post("/sign-up", userModelValidationMiddleware, signUp);
authRouter.post("/sign-in", signIn);
export default authRouter;