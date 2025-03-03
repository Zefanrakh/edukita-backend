import { Role } from "../entities/user";

export class ReadUserDto {
  id: number;
  name: string;
  email: string;
  role: Role;
}
