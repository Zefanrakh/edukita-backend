import { NextFunction, Request, Response } from "express-serve-static-core";
import { CreateUserDto } from "../dtos/users/CreateUser.dto";
import { CreateUserQueryParams } from "../types/query-params";
import { ReadUserDto } from "../dtos/ReadUser.dto";
import { createUser } from "./users";
import { AuthService } from "../services/authService";
import { LoginUserDto } from "../dtos/LoginUser.dto";

const authService = new AuthService();

export async function register(
  request: Request<{}, {}, CreateUserDto, CreateUserQueryParams>,
  response: Response<ReadUserDto>,
  next: NextFunction
) {
  try {
    await createUser(request, response, next);
  } catch (error: any) {
    next(error);
  }
}

export const login = async (
  req: Request<{}, {}, LoginUserDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json({ data });
  } catch (error: any) {
    if (error.message === "User not found") {
      error.statusCode = 404;
    } else if (error.message === "Invalid credentials") {
      error.statusCode = 401;
    }
    next(error);
  }
};
