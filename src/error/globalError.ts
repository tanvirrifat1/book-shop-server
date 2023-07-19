import { ErrorRequestHandler } from "express";
import { MongooseError } from "mongoose";
import { IGenericErrorMessage } from "./Ierror";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let message = "Something went wrong";
  let errorMessages: IGenericErrorMessage[] = [];
  if (error instanceof MongooseError || error?.code === 11000) {
    message = error.message;
    errorMessages = [
      {
        path: "",
        message: error?.message,
      },
    ];
  }

  if (error?.name === "ValidationError") {
    const arrangedError = Object.values(error?.errors).map((err: any) => {
      console.log(err);
      return {
        path: err?.path,
        message: err?.message,
      };
    });
    message = error?.message;
    errorMessages = arrangedError;
  }

  res.status(500).json({
    success: false,
    message,
    errorMessages,
    stack: error?.stack ? error?.stack : "No stack found",
  });
};

export default globalErrorHandler;
