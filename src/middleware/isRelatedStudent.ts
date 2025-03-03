import { Request, Response, NextFunction } from "express";
import { Role, User } from "../entities/user";
import { GetAssignmentsQueryDto } from "../dtos/assignments/GetAssignmentsQuery.dto";
import { GetGradesByStudentParamDto } from "../dtos/assignments/GetGradesByStudentParam.dto";
import { GetAssignmentsByStudentParamDto } from "../dtos/assignments/GetAssignmentsByStudentParam.dto";

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
