import express from "express";
import { loginUserController, registerUserController } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);

export const userRoute = userRouter;
export default userRouter;