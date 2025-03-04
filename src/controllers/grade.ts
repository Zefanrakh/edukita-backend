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

/**
 * Grades an assignment manually.
 *
 * - Validates the request body against `GradeAssignmentDto`.
 * - Throws validation errors if any.
 * - Calls the service to store the grade.
 *
 * @param {Request} request - Express request object containing grading data in `body`.
 * @param {Response} response - Express response object.
 * @param {NextFunction} next - Express next function for error handling.
 *
 * @returns {Promise<void>} Responds with the newly created grade.
 *
 * @example
 * app.post("/grades", gradeAssignement);
 */
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

/**
 * Retrieves a paginated list of grades based on query parameters.
 *
 * - Converts query parameters into an instance of `GetGradesQueryDto`.
 * - Calls the service to fetch grades.
 *
 * @param {Request<{}, {}, {}, GetGradesQueryDto>} request - Express request object with query parameters.
 * @param {Response} response - Express response object.
 * @param {NextFunction} next - Express next function for error handling.
 *
 * @returns {Promise<void>} Responds with a paginated list of grades.
 *
 * @example
 * app.get("/grades", getGrades);
 */
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

/**
 * Retrieves a paginated list of grades for a specific student.
 *
 * - Converts `studentId` from params into an instance of `GetGradesByStudentParamDto`.
 * - Converts query parameters into an instance of `GetGradesQueryDto`.
 * - Calls the service to fetch grades for the given student.
 *
 * @param {Request<GetGradesByStudentParamDto, {}, {}, GetGradesQueryDto>} request - Express request object with student ID in `params` and query parameters.
 * @param {Response} response - Express response object.
 * @param {NextFunction} next - Express next function for error handling.
 *
 * @returns {Promise<void>} Responds with a paginated list of grades for the given student.
 *
 * @example
 * app.get("/students/:studentId/grades", getGradesByStudent);
 */
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

/**
 * Uses AI to generate a grade and feedback for an assignment.
 *
 * - Converts `assignmentId` from params into an instance of `GradeRecommendationWithAiParamDto`.
 * - Calls the AI grading service to generate a grade and feedback.
 *
 * @param {Request<GradeRecommendationWithAiParamDto>} request - Express request object with assignment ID in `params`.
 * @param {Response} response - Express response object containing AI-generated grading and feedback.
 * @param {NextFunction} next - Express next function for error handling.
 *
 * @returns {Promise<void>} Responds with AI-generated grade and feedback.
 *
 * @example
 * app.get("/assignments/:assignmentId/grade-ai", gradeAndFeedbackWithAi);
 */
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
    response.json(recommendation);
  } catch (error) {
    next(error);
  }
}
