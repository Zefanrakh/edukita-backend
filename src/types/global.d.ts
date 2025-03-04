import * as express from "express-serve-static-core";
import { QueryRunner } from "typeorm";

declare global {
  namespace Express {
    interface Request {
      queryRunner: QueryRunner;
    }
  }
}
