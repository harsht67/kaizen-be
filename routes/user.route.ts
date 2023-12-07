import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/logout', logoutUser);

export default userRouter;