import express from "express";
import { userRouter } from "./modules/user/user.router";
import { errorHandler } from "./middlewares/error-handler";
import cors from "cors";

const apiPath = "/api/v1";
const app = express();

app.use(express.json());
app.use(
  `${apiPath}/user`,
  cors({ credentials: true, origin: "http://localhost:3000" }),
  userRouter
);
app.use(errorHandler);

export { app };
