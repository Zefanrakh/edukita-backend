import { NextFunction, Request, Response } from "express-serve-static-core";
import { AppDataSource } from "../config/database";

export const startTransaction = async (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  request.queryRunner = queryRunner;

  next();
};
