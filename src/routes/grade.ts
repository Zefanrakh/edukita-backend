import { Router } from "express";
import { checkRole } from "../middleware/checkRole";
import { Role } from "../entities/user";
import {
  getGrades,
  getGradesByStudent,
  gradeAndFeedbackWithAi,
  gradeAssignement,
} from "../controllers/grade";
import { requireAuth } from "../middleware/requireAuth";
import { isRelatedStudent } from "../middleware/isRelatedStudent";

const router = Router();

router.use(requireAuth);

router.post("/", checkRole(Role.Teacher), gradeAssignement);
router.get("/", checkRole(Role.Teacher), getGrades);
router.get("/ai/:assignmentId", checkRole(Role.Teacher), gradeAndFeedbackWithAi);
router.get("/:studentId", isRelatedStudent(), getGradesByStudent);

export default router;
