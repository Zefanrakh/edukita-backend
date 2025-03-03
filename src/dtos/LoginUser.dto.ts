import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: "Password minimum length of 6 characters" })
  password: string;
}
