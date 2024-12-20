import { Request, Response, NextFunction } from "express";

const register = async (req: Request, res: Response) => {
  res.status(200).json("Bonjour");
};

module.exports = {
  register,
};
