import { IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class GetGradesByStudentParamDto {
  @IsNumber()
  @Type(() => Number)
  studentId!: number;
}
