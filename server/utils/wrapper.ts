import { Request, Response, NextFunction } from "express";

export const wrapRoute = (
  handlers: Array<(req: Request, res: Response, next: NextFunction) => any>
) => {
  return handlers.map((handler) => {
    if (Array.isArray(handler)) {
      return handler.map((h) => asyncWrapper(h));
    }
    return asyncWrapper(handler);
  });
};

const asyncWrapper = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
