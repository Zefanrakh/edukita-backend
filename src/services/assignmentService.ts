import { Request } from "express-serve-static-core";
import { assignmentRepository } from "../repositories/assignmentRepository";
import { Assignment } from "../entities/assignment";
import { SubmitAssignmentDto } from "../dtos/assignments/SubmitAssignment.dto";
import { User } from "../entities/user";
import { Brackets, FindManyOptions, ILike } from "typeorm";
import { GetAssignmentsQueryDto } from "../dtos/assignments/GetAssignmentsQuery.dto";
import { ReadPaginationContainerDto } from "../dtos/pagination/ReadPagination.dto";
import { PaginationService } from "./paginationService";
import { Grade } from "../entities/grade";

export class AssignmentService extends PaginationService<AssignmentService> {
  public assignmentRepository = assignmentRepository;

  /**
   * Submits an assignment.
   * @param {Request<{}, {}, SubmitAssignmentDto>} request - The request object containing assignment details.
   * @returns {Promise<Assignment | null>} The submitted assignment or null if submission fails.
   */
  async submitAssignement(
    request: Request<{}, {}, SubmitAssignmentDto>
  ): Promise<Assignment | null> {
    const { subject, title, content } = request.body;

    const student = request.user as User;

    return await this.create({
      subject,
      title,
      content,
      student,
    });
  }

  /**
   * Creates a new assignment.
   * @param {SubmitAssignmentDto & { student: User }} payload - The assignment data including student information.
   * @returns {Promise<Assignment>} The created assignment.
   */
  async create(
    payload: SubmitAssignmentDto & { student: User }
  ): Promise<Assignment> {
    const assignment = this.assignmentRepository.create(payload);
    return await this.assignmentRepository.save(assignment);
  }

  /**
   * Retrieves assignments based on query options.
   * @param {FindManyOptions<Assignment>} [options] - Query options.
   * @returns {Promise<Assignment[]>} A list of assignments.
   */
  async find(
    options?: FindManyOptions<Assignment> | undefined
  ): Promise<Assignment[]> {
    const assignments = await this.assignmentRepository.find(options);
    return assignments;
  }

  /**
   * Retrieves an assignment by its ID.
   * @param {number} id - The ID of the assignment.
   * @returns {Promise<Assignment>} The assignment found or an error if not found.
   */
  async findById(id: number): Promise<Assignment> {
    const assignment = await this.assignmentRepository.findOneByOrFail({ id });
    return assignment;
  }

  /**
   * Retrieves paginated assignments with filtering options.
   * @param {GetAssignmentsQueryDto} payload - Query parameters for pagination.
   * @param {number} [studentId] - Optional student ID filter.
   * @returns {Promise<ReadPaginationContainerDto<Assignment>>} Paginated assignments.
   */
  async findAssignmentsPaginate(
    payload: GetAssignmentsQueryDto,
    studentId?: number
  ): Promise<ReadPaginationContainerDto<Assignment>> {
    const paginated = await this.findPaginate<Assignment>({
      payload,
      repository: "assignmentRepository",
      queryModifier(qb) {
        const { search, subject } = payload;
        const query = qb
          .leftJoinAndMapOne(
            "assignment.grade",
            Grade,
            "grade",
            "grade.assignment = assignment.id"
          )
          .leftJoinAndSelect("assignment.student", "student")
          .leftJoinAndSelect("grade.teacher", "teacher");
        if (search) {
          query.andWhere(
            new Brackets((qb) => {
              qb.where("assignment.content LIKE :search", {
                search: `%${search}%`,
              })
                .orWhere("assignment.title LIKE :search", {
                  search: `%${search}%`,
                })
                .orWhere("student.name LIKE :search", {
                  search: `%${search}%`,
                })
                .orWhere("student.email LIKE :search", {
                  search: `%${search}%`,
                })
                .orWhere("teacher.name LIKE :search", {
                  search: `%${search}%`,
                })
                .orWhere("teacher.email LIKE :search", {
                  search: `%${search}%`,
                });
            })
          );
        }
        if (subject) {
          query.andWhere(
            new Brackets((qb) => {
              qb.where("assignment.subject LIKE :subject", {
                subject: `%${subject}%`,
              });
            })
          );
        }
        if (studentId) {
          query.andWhere(
            new Brackets((qb) => {
              qb.where("student.id LIKE :studentId", {
                studentId: `%${studentId}%`,
              });
            })
          );
        }
        return query;
      },
    });
    return paginated;
  }
}
