import { NextFunction, Request, Response } from "express-serve-static-core";
import { AssignmentService } from "../services/assignmentService";
import { plainToInstance } from "class-transformer";
import { SubmitAssignmentDto } from "../dtos/assignments/SubmitAssignment.dto";
import { validate } from "class-validator";
import { throwIfAnyDtoValidationErrors } from "../utils/throwValidationError";
import { GetAssignmentsQueryDto } from "../dtos/assignments/GetAssignmentsQuery.dto";
import { GetAssignmentsByStudentParamDto } from "../dtos/assignments/GetAssignmentsByStudentParam.dto";
import { NotificationService } from "../services/notificationService";
import { User } from "../entities/user";

const assignmentService = new AssignmentService();
const notificationService = new NotificationService();

/**
 * Submits an assignment.
 *
 * - Validates the request body against `SubmitAssignmentDto`.
 * - Throws validation errors if any.
 * - Calls the service to submit the assignment.
 *
 * @param {Request} request - Express request object containing the assignment data in `body`.
 * @param {Response} response - Express response object.
 * @param {NextFunction} next - Express next function for error handling.
 *
 * @returns {Promise<void>} Responds with the newly created assignment.
 *
 * @example
 * app.post("/assignments", submitAssignment);
 */
export async function submitAssignment(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const createUserDto = plainToInstance(SubmitAssignmentDto, request.body);
    const validationErrors = await validate(createUserDto);
    throwIfAnyDtoValidationErrors(validationErrors);

    const newAssignment = await assignmentService.submitAssignement(request);

    const student = request.user as User;
    if (newAssignment) {
      await notificationService.notifyTeacher(newAssignment, student);
    }
    response.status(201).json(newAssignment);
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieves a paginated list of assignments based on query parameters.
 *
 * - Converts query parameters into an instance of `GetAssignmentsQueryDto`.
 * - Calls the service to fetch assignments.
 *
 * @param {Request<{}, {}, {}, GetAssignmentsQueryDto>} request - Express request object with query parameters.
 * @param {Response} response - Express response object.
 * @param {NextFunction} next - Express next function for error handling.
 *
 * @returns {Promise<void>} Responds with a paginated list of assignments.
 *
 * @example
 * app.get("/assignments", getAssignments);
 */
export async function getAssignments(
  request: Request<{}, {}, {}, GetAssignmentsQueryDto>,
  response: Response,
  next: NextFunction
) {
  try {
    const payloadDto = plainToInstance(GetAssignmentsQueryDto, request.query);
    const paginatedAssignments =
      await assignmentService.findAssignmentsPaginate(payloadDto);
    response.send(paginatedAssignments);
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieves a paginated list of assignments for a specific student.
 *
 * - Converts `studentId` from params into an instance of `GetAssignmentsByStudentParamDto`.
 * - Converts query parameters into an instance of `GetAssignmentsQueryDto`.
 * - Calls the service to fetch assignments for the given student.
 *
 * @param {Request<GetAssignmentsByStudentParamDto, {}, {}, GetAssignmentsQueryDto>} request - Express request object with student ID in `params` and query parameters.
 * @param {Response} response - Express response object.
 * @param {NextFunction} next - Express next function for error handling.
 *
 * @returns {Promise<void>} Responds with a paginated list of assignments for the given student.
 *
 * @example
 * app.get("/students/:studentId/assignments", getAssignmentsByStudent);
 */
export async function getAssignmentsByStudent(
  request: Request<
    GetAssignmentsByStudentParamDto,
    {},
    {},
    GetAssignmentsQueryDto
  >,
  response: Response,
  next: NextFunction
) {
  try {
    const paramDto = plainToInstance(
      GetAssignmentsByStudentParamDto,
      request.params
    );
    const payloadDto = plainToInstance(GetAssignmentsQueryDto, request.query);
    const paginatedAssignments =
      await assignmentService.findAssignmentsPaginate(
        payloadDto,
        paramDto.studentId
      );
    response.send(paginatedAssignments);
  } catch (error) {
    next(error);
  }
}
