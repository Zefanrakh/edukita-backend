import express from "express";
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import assignmentsRouter from "./routes/assignment";
import gradeRouter from "./routes/grade";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
import "reflect-metadata";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
  app.use("/assignments", assignmentsRouter);
  app.use("/grades", gradeRouter);

  app.use(errorHandler);
  return app;
}
