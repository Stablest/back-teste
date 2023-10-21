import express from "express";
import { userRouter } from "./modules/user/user.router";
import { errorHandler } from "./middlewares/error-handler";

const apiPath = "/api/v1";
const app = express();

app.use(express.json());
app.use(`${apiPath}/user`, userRouter);

export { app };
