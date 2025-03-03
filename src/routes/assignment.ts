import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import {
  getAssignments,
  getAssignmentsByStudent,
  submitAssignment,
} from "../controllers/assignment";
import { checkRole } from "../middleware/checkRole";
import { Role } from "../entities/user";
import { isRelatedStudent } from "../middleware/isRelatedStudent";

const router = Router();

router.use(requireAuth);

router.post("/", checkRole(Role.Student), submitAssignment);
router.get("/", checkRole(Role.Teacher), getAssignments);
router.get("/:studentId", isRelatedStudent(), getAssignmentsByStudent);

export default router;
