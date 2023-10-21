import express from "express";
import { authRouter } from "./routers/auth";

const apiPath = "/api/v1";
const app = express();

app.use(express.json);
app.use(`${apiPath}/auth`, authRouter);

export { app };
