import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";
import { AppException } from "../lib/app-exception";

const errorHandler: ErrorRequestHandler = (error: Error, req, res, next) => {
  let statusCode = 500;
  let errorMessage = "An unknown error occurred";
  if (isHttpError(error) || error instanceof AppException) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ status: false, message: errorMessage });
};

export default errorHandler;
