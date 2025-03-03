import { NextFunction, Request, Response } from "express-serve-static-core";
import { CreateUserDto } from "../dtos/users/CreateUser.dto";
import { CreateUserQueryParams } from "../types/query-params";
import { ReadUserDto } from "../dtos/ReadUser.dto";
import { createUser } from "./users";
import { AuthService } from "../services/authService";
import { LoginUserDto } from "../dtos/LoginUser.dto";

const authService = new AuthService();

/**
 * Registers a new user.
 *
 * - Calls `createUser` function from `users` controller.
 * - Handles any errors that occur during the registration process.
 *
 * @param {Request<{}, {}, CreateUserDto, CreateUserQueryParams>} request - Express request object containing user registration data.
 * @param {Response<ReadUserDto>} response - Express response object containing the created user data.
 * @param {NextFunction} next - Express next function for error handling.
 *
 * @returns {Promise<void>} Responds with the newly created user data.
 *
 * @example
 * app.post("/auth/register", register);
 */
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

/**
 * Logs in a user.
 *
 * - Extracts `email` and `password` from the request body.
 * - Calls `authService.login()` to authenticate the user.
 * - Returns the authentication data (e.g., JWT token).
 * - Sets appropriate error status codes if login fails.
 *
 * @param {Request<{}, {}, LoginUserDto>} req - Express request object containing login credentials.
 * @param {Response} res - Express response object containing authentication data.
 * @param {NextFunction} next - Express next function for error handling.
 *
 * @returns {Promise<void>} Responds with authentication data or an error message.
 *
 * @example
 * app.post("/auth/login", login);
 */
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
