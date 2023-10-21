import express from "express";
import { configDotenv } from "dotenv";
import { userModel } from "./user.model";
import { IUser } from "./interfaces/user.interface";
import { ITokenResponse } from "./interfaces/token.interface";

configDotenv();

async function loginUser(
  req: express.Request<any, any, IUser>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("Please provide email and password");
    const user = await userModel.findOne({ email });
    if (!user) throw new Error("Invalid email or password");
    const isPasswordCorrect = await user.comparePassword(password.toString());
    if (!isPasswordCorrect) throw new Error("Invalid email or password");
    const token = user.createJWT();
    const responseObject: ITokenResponse = {
      user: { id: user._id },
      token,
    };
    return res.status(200).json(responseObject);
  } catch (err: unknown) {
    next(err);
  }
}

async function registerUser(
  req: express.Request<any, any, IUser>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const user = await userModel.create({ ...req.body });
    const token = user.createJWT();
    const responseObject: ITokenResponse = {
      user: { id: user._id },
      token,
    };
    res.status(201).json(responseObject);
  } catch (err: unknown) {
    next(err);
  }
}

export { loginUser, registerUser };
