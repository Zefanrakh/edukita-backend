import { IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class GetAssignmentsByStudentParamDto {
  @IsNumber()
  @Type(() => Number)
  studentId!: number;
}
