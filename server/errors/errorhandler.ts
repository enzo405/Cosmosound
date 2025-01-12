import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { WebError } from "./Error";
import dotenv from "dotenv";

dotenv.config();

export const errorHandler: ErrorRequestHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isDev = process.env.NODE_ENV !== "production";

  if (err instanceof WebError) {
    if (isDev) {
      console.error(`${err.statusCode} - ${err.statusMessage}`);
    }
    res.status(err.statusCode).json({ error: err.statusMessage });
  } else {
    if (isDev) {
      console.error(`${err.cause} - ${err.message}`, err.stack);
    }
    // Use a generic error message for security reasons
    res.status(500).json({ error: "Internal Server Error" });
  }
};
