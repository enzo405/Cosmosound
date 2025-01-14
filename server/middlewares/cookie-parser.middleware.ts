import express, { Request, Response, NextFunction } from "express";

const cookieParser = async (req: Request, res: Response, next: NextFunction) => {
  const cookieHeader = req.headers.cookie;

  req.cookies = {};

  if (cookieHeader) {
    cookieHeader.split(";").forEach((cookie) => {
      const [name, value] = cookie.split("=").map((part) => part.trim());
      req.cookies[name] = decodeURIComponent(value);
    });
  }

  next();
};

export default cookieParser;
