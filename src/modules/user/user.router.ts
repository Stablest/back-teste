import express from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
  updateUserById,
  verifyUserLogin,
} from "./user.controller";
import { adminCheck } from "../../middlewares/admin-check";

const userRouter = express.Router();

userRouter.route("/auth").get(verifyUserLogin).post(loginUser);
userRouter
  .route("/")
  .get(adminCheck, getAllUsers)
  .post(adminCheck, registerUser);

userRouter
  .route("/:id")
  .get(adminCheck, getUserById)
  .patch(adminCheck, updateUserById)
  .delete(adminCheck, deleteUserById);

export { userRouter };
