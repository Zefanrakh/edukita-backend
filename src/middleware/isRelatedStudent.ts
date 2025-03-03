import { Request, Response, NextFunction } from "express";
import { Role, User } from "../entities/user";
import { GetAssignmentsQueryDto } from "../dtos/assignments/GetAssignmentsQuery.dto";
import { GetGradesByStudentParamDto } from "../dtos/assignments/GetGradesByStudentParam.dto";
import { GetAssignmentsByStudentParamDto } from "../dtos/assignments/GetAssignmentsByStudentParam.dto";

/**
 * Middleware to check if the authenticated user is either a teacher
 * or the student related to the requested resource.
 *
 * Ensures that:
 * - A teacher can access any student's data.
 * - A student can only access their own data.
 *
 * @returns {(req: Request<GetGradesByStudentParamDto | GetAssignmentsByStudentParamDto, {}, {}, GetAssignmentsQueryDto | {}>, res: Response, next: NextFunction) => void} Middleware function.
 *
 * @example
 * app.get("/students/:studentId/grades", isRelatedStudent(), (req, res) => {
 *   res.send("You have access to these grades.");
 * });
 */
export function isRelatedStudent() {
  return (
    req: Request<
      GetGradesByStudentParamDto | GetAssignmentsByStudentParamDto,
      {},
      {},
      GetAssignmentsQueryDto | {}
    >,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user as User;

    if (
      user.role !== Role.Teacher &&
      String(user.id).toString() !== String(req.params.studentId).toString()
    ) {
      res.status(403).json({ message: `Forbidden: You are not allowed'` });
      return;
    }

    next();
  };
}
