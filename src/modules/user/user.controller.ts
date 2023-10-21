import express from "express";
import { configDotenv } from "dotenv";
import { userModel } from "./user.model";
import { IUser } from "./interfaces/user.interface";
import { ITokenResponse, ITokenUser } from "./interfaces/token.interface";
import { Permission } from "./interfaces/permission.enum";
import { Request, Response, NextFunction } from "express";

configDotenv();

async function loginUser(
  req: Request<any, any, IUser>,
  res: Response,
  next: NextFunction
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
  req: Request<any, any, IUser>,
  res: Response,
  next: NextFunction
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

async function getAllUsers(
  req: Request<any, any, IUser>,
  res: Response,
  next: NextFunction
) {
  try {
    if (res.locals.user.permission < Permission.ADM)
      throw new Error("Not authorized to acess this route");
    const allUsers = await userModel.find({}, "name email permission");
    res.status(200).json({ users: allUsers });
  } catch (err) {
    next(err);
  }
}

async function getUserById(
  req: Request<any, any, ITokenUser>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.body;
    if (res.locals.user.permission != Permission.ADM) {
      if (res.locals.user.id != id)
        throw new Error("Not authorized to acess this route");
    }
    const user = await userModel.findById(id);
    res.status(200).json({ user: user });
  } catch (err) {
    next(err);
  }
}

export { loginUser, registerUser, getAllUsers, getUserById };
