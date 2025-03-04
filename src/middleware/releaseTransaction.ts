import { NextFunction, Request, Response } from "express-serve-static-core";

export const releaseTransaction = async (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  await request.queryRunner.release();

  next();
};
