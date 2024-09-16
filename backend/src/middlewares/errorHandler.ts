import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";
import { appConfig } from "../config/app.config";
import { AppException } from "../lib/app-exception";

const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response
) => {
  let statusCode = 500;
  let errorMessage = "An unknown error occurred";
  let errorStack = null;

  if (isHttpError(error) || error instanceof AppException) {
    statusCode = error.statusCode;
    errorMessage = error.message;
    errorStack = appConfig.NODE_ENV !== "production" ? error.stack : null;
  }

  req.log.error(error, errorMessage);

  res
    .status(statusCode)
    .json({ status: false, message: errorMessage, stack: error });
};

export default errorHandler;
