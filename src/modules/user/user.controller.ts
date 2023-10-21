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
    res.status(201).json({ user: user });
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
    const allUsers = await userModel.find();
    res.status(200).json({ users: allUsers });
  } catch (err) {
    next(err);
  }
}

async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (!id) throw new Error("aa");
    const user = await userModel.findById(id);
    res.status(200).json({ user: user });
  } catch (err) {
    next(err);
  }
}

async function updateUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { newInfo } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(id, newInfo, {
      new: true,
    });
    res.status(200).json({ user: updatedUser });
  } catch (err) {
    next(err);
  }
}

async function deleteUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    res.status(200).json({ user: deletedUser });
  } catch (err) {
    next(err);
  }
}

export {
  loginUser,
  registerUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
