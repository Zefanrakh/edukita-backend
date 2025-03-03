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

export function getUsers(_: Request, response: Response) {
  response.send([]);
}

export function getUserById(_: Request, response: Response) {
  response.send({});
}

export async function createUser(
  request: Request<{}, {}, CreateUserDto, CreateUserQueryParams>,
  response: Response<ReadUserDto>,
  next: NextFunction
) {
  try {
    const createUserDto = plainToInstance(CreateUserDto, request.body);
    const validationErrors = await validate(createUserDto);
    throwIfAnyDtoValidationErrors(validationErrors);

    const user = await authService.registerUser(createUserDto);
    response.status(201).json(instanceToPlain(user) as ReadUserDto);
  } catch (error: any) {
    next(error);
  }
}

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
