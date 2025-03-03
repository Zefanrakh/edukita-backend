import { ReadUserDto } from "../ReadUser.dto";

export class GetAuthorizedUserDto {
  token!: string;
  user!: ReadUserDto;
}
