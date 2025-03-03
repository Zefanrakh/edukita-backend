import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "./userService";
import { CreateUserDto } from "../dtos/users/CreateUser.dto";
import { GetAuthorizedUserDto } from "../dtos/users/GetAuthorizedUser.dto";

const userService = new UserService();

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

export class AuthService {
  async login(email: string, password: string): Promise<GetAuthorizedUserDto> {
    const user = await userService.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "32h",
    });

    return { token, user };
  }

  async registerUser(createUserDto: CreateUserDto) {
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    }

    const user = await userService.create(createUserDto);
    return user;
  }
}
