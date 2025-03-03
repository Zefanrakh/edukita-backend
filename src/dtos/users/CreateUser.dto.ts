import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";
import { Role } from "../../entities/user";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: "Password minimum length of 6 characters" })
  password: string;

  @IsNotEmpty()
  @IsEnum(Role, { message: "The role must be either 'student' or 'teacher'." })
  role: Role;
}
