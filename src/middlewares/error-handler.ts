import express from "express";
import { CustomAPIError } from "../errors/custom-api-error";
import mongoose from "mongoose";
import { MongoServerError } from "mongodb";

function errorHandler(
  err: unknown,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!(err instanceof Error))
    return res.status(500).json({ message: "Something went wrong try again" });
  let newError: { statusCode: number; message: null | string } = {
    statusCode: 500,
    message: "Something went wrong try again",
  };
  errorTypeResponse(err, newError);
  return res.status(newError.statusCode).json({ message: err.message });
}

function errorTypeResponse(
  err: InstanceType<typeof Error>,
  newError: { statusCode: number; message: null | string }
) {
  if (err instanceof CustomAPIError) {
    newError.statusCode = err.statusCode ?? 500;
    newError.message = err.message || "Something went wrong try again";
    return newError;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    newError.statusCode = 400;
    newError.message = err.message || "Something went wrong try again";
    return newError;
  }

  if (err instanceof SyntaxError) {
    newError.statusCode = 400;
    newError.message = err.message;
    return newError;
  }

  if (err instanceof MongoServerError) {
    if (err.code === 11000) {
      newError.statusCode = 400;
      newError.message = err.message || "Something went wrong try again";
      return newError;
    }
  }
}

export { errorHandler };
