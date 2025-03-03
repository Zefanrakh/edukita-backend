import { NextFunction, Request, Response } from "express-serve-static-core";
import { AssignmentService } from "../services/assignmentService";
import { plainToInstance } from "class-transformer";
import { SubmitAssignmentDto } from "../dtos/assignments/SubmitAssignment.dto";
import { validate } from "class-validator";
import { throwIfAnyDtoValidationErrors } from "../utils/throwValidationError";
import { GetAssignmentsQueryDto } from "../dtos/assignments/GetAssignmentsQuery.dto";
import { GetAssignmentsByStudentParamDto } from "../dtos/assignments/GetAssignmentsByStudentParam.dto";

const assignmentService = new AssignmentService();

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
    response.status(201).json(newAssignment);
  } catch (error) {
    next(error);
  }
}

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
