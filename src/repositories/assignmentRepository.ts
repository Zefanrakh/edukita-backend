import { AppDataSource } from "../config/database";
import { Assignment } from "../entities/assignment";

export const assignmentRepository = AppDataSource.getRepository(Assignment);
