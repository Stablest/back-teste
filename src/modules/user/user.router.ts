import express from "express";

const userRouter = express.Router();

userRouter.route("/auth").get().post();

userRouter.route("/").get().post();

export { userRouter };
