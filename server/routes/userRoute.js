import express from "express";
import { loginUserController, registerUserController, verifyCodeController } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.post("/verify", verifyCodeController);

export const userRoute = userRouter;
export default userRouter;