import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Subject } from "../../entities/assignment";

export class SubmitAssignmentDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsNotEmpty()
  @IsEnum(Subject, {
    message: "The subject must be either 'English' or 'Math'.",
  })
  subject: Subject;
}
