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
  const isDebug = process.env.NODE_DEBUG === "true";

  if (err instanceof WebError) {
    if (isDebug) {
      console.error(`${err.statusCode} - ${err.statusMessage}`);
    }
    res.status(err.statusCode).json({ error: err.statusMessage });
  } else {
    // Use a generic error message for security reasons
    res.status(500).json({ error: "Internal Server Error" });
  }
};
