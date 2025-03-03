import { AppDataSource } from "../config/database";
import { Grade } from "../entities/grade";

export const gradeRepository = AppDataSource.getRepository(Grade);
