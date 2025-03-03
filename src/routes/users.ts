import { Router } from "express";
import {
  createUser,
  getAllStudents,
  getUserById,
  getUsers,
} from "../controllers/users";
import { requireAuth } from "../middleware/requireAuth";
import { checkRole } from "../middleware/checkRole";
import { Role } from "../entities/user";

const router = Router();

router.use(requireAuth);

router.get("/", getUsers);
router.get("/students", checkRole(Role.Teacher), getAllStudents);
router.get("/:id", getUserById);
router.post("/", createUser);

export default router;
