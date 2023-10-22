import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import { userModel } from "./user.model";
import { IUser } from "./interfaces/user.interface";
import { ITokenResponse, ITokenUser } from "./interfaces/token.interface";
import { Permission } from "./interfaces/permission.enum";
import { Request, Response, NextFunction } from "express";
import { CustomAPIError } from "../../errors/custom-api-error";
import { BadRequestError } from "../../errors/bad-request";
import { AuthenticationError } from "../../errors/authentication-error";
import { UnknownError } from "../../errors/unknown-error";

configDotenv();

async function verifyUserLogin(
  req: Request,
  res: Response,
  next: NextFunction
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

    const tokenUser: ITokenUser = {
      id: tokenPayload.id,
    };

    console.log(tokenUser);
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function loginUser(
  req: Request<any, any, IUser>,
  res: Response,
  next: NextFunction
) {
  try {
    const { login, password } = req.body;
    if (!login || !password)
      throw new BadRequestError("Please provide login and password");
    const user = await userModel.findOne({ login });
    if (!user) throw new AuthenticationError("Invalid login or password");
    const isPasswordCorrect = await user.comparePassword(password.toString());
    if (!isPasswordCorrect)
      throw new AuthenticationError("Invalid login or password");
    const token = user.createJWT();
    const responseObject: ITokenResponse = {
      user: { id: user._id },
      token,
    };
    return res
      .cookie("jwt_token", token, {
        secure: false,
      })
      .status(200)
      .json(responseObject);
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
    if (!user) throw new UnknownError();
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
    const allUsers = await userModel.find();
    if (!allUsers) throw new UnknownError();
    res.status(200).json({ users: allUsers });
  } catch (err) {
    next(err);
  }
}

async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (!id) throw new BadRequestError("Please provide a valid id parameter");
    console.log(id);
    const user = await userModel.findById(id);
    res.status(200).json({ user: user });
  } catch (err) {
    next(err);
  }
}

async function updateUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { ...newInfo } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(id, newInfo, {
      new: true,
      runValidators: true,
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
  verifyUserLogin,
};
