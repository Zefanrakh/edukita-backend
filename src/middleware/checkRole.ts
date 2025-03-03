import { Request, Response, NextFunction } from "express";
import { Role, User } from "../entities/user";
import { GetAssignmentsQueryDto } from "../dtos/assignments/GetAssignmentsQuery.dto";

export function checkRole(role: Role) {
  return (
    req: Request<{}, {}, {}, GetAssignmentsQueryDto | {}>,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user as User;

    if (!user) {
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }

    if (user.role !== role) {
      res.status(403).json({ message: `Forbidden: Requires role '${role}'` });
      return;
    }

    next();
  };
}
