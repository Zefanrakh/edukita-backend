import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);

  if (err.code === "SQLITE_CONSTRAINT" || err.code === "23505") {
    err.statusCode = 409;
  }

  let statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  if (message === "Unauthorized") {
    statusCode = 401;
  }

  res
    .status(statusCode)
    .json({ message, code: err.code || null, details: err.details || null });
}
