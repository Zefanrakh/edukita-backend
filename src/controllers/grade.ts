import { NextFunction, Request, Response } from "express-serve-static-core";
import { GradeService } from "../services/gradeService";
import { plainToInstance } from "class-transformer";
import { GradeAssignmentDto } from "../dtos/grades/GradeAssignment.dto";
import { validate } from "class-validator";
import { throwIfAnyDtoValidationErrors } from "../utils/throwValidationError";
import { GetGradesQueryDto } from "../dtos/assignments/GetGradesQuery.dto";
import { GetGradesByStudentParamDto } from "../dtos/assignments/GetGradesByStudentParam.dto";
import { GradeRecommendationWithAiParamDto } from "../dtos/grades/GradeRecommendationWithAiParam.dto";

const gradeService = new GradeService();

export async function gradeAssignement(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const gradeAssignmentDto = plainToInstance(
      GradeAssignmentDto,
      request.body
    );
    const validationErrors = await validate(gradeAssignmentDto);
    throwIfAnyDtoValidationErrors(validationErrors);

    const newGrade = await gradeService.gradeAssignement(request);
    response.status(201).json(newGrade);
  } catch (error) {
    next(error);
  }
}

export async function getGrades(
  request: Request<{}, {}, {}, GetGradesQueryDto>,
  response: Response,
  next: NextFunction
) {
  try {
    const payloadDto = plainToInstance(GetGradesQueryDto, request.query);
    const paginatedGrades = await gradeService.findGradesPaginate(payloadDto);
    response.send(paginatedGrades);
  } catch (error) {
    next(error);
  }
}

export async function getGradesByStudent(
  request: Request<GetGradesByStudentParamDto, {}, {}, GetGradesQueryDto>,
  response: Response,
  next: NextFunction
) {
  try {
    const paramDto = plainToInstance(
      GetGradesByStudentParamDto,
      request.params
    );
    const payloadDto = plainToInstance(GetGradesQueryDto, request.query);
    const paginatedGrades = await gradeService.findGradesPaginate(
      payloadDto,
      paramDto.studentId
    );
    response.send(paginatedGrades);
  } catch (error) {
    next(error);
  }
}

export async function gradeAndFeedbackWithAi(
  request: Request<GradeRecommendationWithAiParamDto>,
  response: Response,
  next: NextFunction
) {
  try {
    const paramDto = plainToInstance(
      GradeRecommendationWithAiParamDto,
      request.params
    );
    const recommendation = await gradeService.gradeAndFeedbackWithAi(
      paramDto.assignmentId
    );
    console.log({ recommendation });
    response.json(recommendation);
  } catch (error) {
    next(error);
  }
}
