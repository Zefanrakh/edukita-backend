import { IsNotEmpty, IsNumber } from "class-validator";

export class GradeRecommendationWithAiParamDto {
  @IsNotEmpty()
  @IsNumber()
  assignmentId!: number;
}
