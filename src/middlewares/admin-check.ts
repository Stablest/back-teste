import express from "express";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { IUser } from "../modules/user/interfaces/user.interface";
import { ITokenUser } from "../modules/user/interfaces/token.interface";
import { Permission } from "../modules/user/interfaces/permission.enum";
configDotenv();

function adminCheck(
  req: express.Request<any, any, IUser>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    )
      throw new Error("Please provide a valid authentication token");
    const token = req.headers.authorization.split(" ")[1];
    const tokenPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as ITokenUser;

    if (tokenPayload.permission != Permission.ADM)
      throw new Error("Not authorized");

    const tokenUser: ITokenUser = {
      id: tokenPayload.id,
    };
    res.locals.user = tokenUser;
    next();
  } catch (err) {
    next(err);
  }
}

export { adminCheck };
