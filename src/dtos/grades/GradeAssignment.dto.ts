import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class GradeAssignmentDto {
  @IsNotEmpty()
  @IsNumber()
  assignmentId!: number;

  @IsNotEmpty()
  @IsNumber()
  grade!: number;

  @IsOptional()
  @IsString()
  feedback?: string;
}
