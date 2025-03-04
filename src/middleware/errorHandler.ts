import { Request, Response, NextFunction } from "express";

/**
 * Global error-handling middleware for Express applications.
 *
 * Logs the error stack and returns an appropriate HTTP response.
 * Handles specific database constraint errors (`SQLITE_CONSTRAINT`, `23505`) by setting status code to 409.
 * Adjusts status code for unauthorized errors.
 *
 * @param {any} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 *
 * @example
 * app.use(errorHandler);
 */
export async function errorHandler(
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

  await req.queryRunner?.rollbackTransaction();

  res
    .status(statusCode)
    .json({ message, code: err.code || null, details: err.details || null });
}
