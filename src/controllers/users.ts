import { Request, Response, NextFunction } from "express-serve-static-core";
import { CreateUserDto } from "../dtos/users/CreateUser.dto";
import { CreateUserQueryParams } from "../types/query-params";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ReadUserDto } from "../dtos/ReadUser.dto";
import { AuthService } from "../services/authService";
import { throwIfAnyDtoValidationErrors } from "../utils/throwValidationError";
import { UserService } from "../services/userService";
import { Role } from "../entities/user";

const authService = new AuthService();
const userService = new UserService();

/**
 * Creates a new user.
 *
 * - Validates the request body using `CreateUserDto`.
 * - Throws validation errors if any.
 * - Calls `authService.registerUser()` to register the user.
 *
 * @param {Request<{}, {}, CreateUserDto, CreateUserQueryParams>} request - Express request object containing user registration data.
 * @param {Response<ReadUserDto>} response - Express response object containing the created user data.
 * @param {NextFunction} next - Express next function for error handling.
 *
 * @returns {Promise<void>} Responds with the newly created user data.
 *
 * @example
 * app.post("/users", createUser);
 */
export async function createUser(
  request: Request<{}, {}, CreateUserDto, CreateUserQueryParams>,
  response: Response<ReadUserDto>,
  next: NextFunction
) {
  try {
    const createUserDto = plainToInstance(CreateUserDto, request.body);
    const validationErrors = await validate(createUserDto);
    throwIfAnyDtoValidationErrors(validationErrors);

    const user = await authService.registerUser(request, createUserDto);
    response.status(201).json(instanceToPlain(user) as ReadUserDto);
  } catch (error: any) {
    next(error);
  }
}

/**
 * Retrieves a list of all students.
 *
 * - Calls `userService.find()` to fetch users with the role `Student`.
 *
 * @param {Request} request - Express request object.
 * @param {Response<ReadUserDto[]>} response - Express response object containing the list of students.
 * @param {NextFunction} next - Express next function for error handling.
 *
 * @returns {Promise<void>} Responds with a list of students.
 *
 * @example
 * app.get("/students", getAllStudents);
 */
export async function getAllStudents(
  request: Request,
  response: Response<ReadUserDto[]>,
  next: NextFunction
) {
  try {
    const users = await userService.find({
      where: {
        role: Role.Student,
      },
    });
    response.status(201).json(users as ReadUserDto[]);
  } catch (error: any) {
    next(error);
  }
}
