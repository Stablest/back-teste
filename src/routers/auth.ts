import express from "express";

const authRouter = express.Router();

authRouter.route("/").get().post();

export { authRouter };
