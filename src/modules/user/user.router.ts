import express from "express";
import { getAllUsers, loginUser, registerUser } from "./user.controller";

const userRouter = express.Router();

userRouter.route("/auth").get(loginUser).post(registerUser);

userRouter.route("/").get().post();

export { userRouter };
