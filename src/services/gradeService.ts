import { Request } from "express-serve-static-core";
import { PaginationService } from "./paginationService";
import { GradeAssignmentDto } from "../dtos/grades/GradeAssignment.dto";
import { Grade } from "../entities/grade";
import { User } from "../entities/user";
import { Assignment } from "../entities/assignment";
import { gradeRepository } from "../repositories/gradeRepository";
import { AssignmentService } from "./assignmentService";
import { Brackets, FindManyOptions } from "typeorm";
import { ReadPaginationContainerDto } from "../dtos/pagination/ReadPagination.dto";
import { GetGradesQueryDto } from "../dtos/assignments/GetGradesQuery.dto";
import { ReadRecommendationWithAiDto } from "../dtos/grades/ReadRecommendationWithAi.dto";
const OpenAI = require("openai-free");
const openai = new OpenAI();

const assignmentService = new AssignmentService();

export class GradeService extends PaginationService<GradeService> {
  public assignmentService = assignmentService;
  public gradeRepository = gradeRepository;

  /**
   * Assigns a grade to an assignment.
   * @param {Request<{}, {}, GradeAssignmentDto>} request - The request object containing the grading data.
   * @returns {Promise<Grade | null>} The graded assignment or null if not found.
   */
  async gradeAssignement(
    request: Request<{}, {}, GradeAssignmentDto>
  ): Promise<Grade | null> {
    const { assignmentId, grade, feedback } = request.body;

    const teacher = request.user as User;
    const assignment = await this.assignmentService.findById(assignmentId);

    return await this.upsertOne(request, {
      grade,
      feedback,
      assignment,
      teacher,
    });
  }

  /**
   * Creates a new grade record.
   * @param {Partial<GradeAssignmentDto> & { teacher: User; assignment: Assignment }} payload - Data for creating the grade.
   * @returns {Promise<Grade>} The created grade.
   */
  async create(
    request: Request,
    payload: Partial<GradeAssignmentDto> & {
      teacher: User;
      assignment: Assignment;
    }
  ): Promise<Grade> {
    const queryRunner = request.queryRunner;
    const assignment = this.gradeRepository.create(payload);
    return await queryRunner.manager.save(assignment);
  }

  /**
   * Retrieves a list of grades based on the provided options.
   * @param {FindManyOptions<Grade>} [options] - Query options.
   * @returns {Promise<Grade[]>} A list of grades.
   */
  async find(options?: FindManyOptions<Grade> | undefined): Promise<Grade[]> {
    const grades = await this.gradeRepository.find(options);
    return grades;
  }

  /**
   * Updates or inserts a grade record.
   * @param {Partial<GradeAssignmentDto> & { teacher: User; assignment: Assignment }} payload - Data to update or insert.
   * @returns {Promise<Grade>} The upserted grade.
   */
  async upsertOne(
    request: Request<{}, {}, GradeAssignmentDto>,
    payload: Partial<GradeAssignmentDto> & {
      teacher: User;
      assignment: Assignment;
    }
  ) {
    const queryRunner = request.queryRunner;
    let grade = await queryRunner.manager.findOne(Grade, {
      where: { assignment: payload.assignment },
    });

    if (grade) {
      Object.assign(grade, payload);
    } else {
      grade = queryRunner.manager.create(Grade, payload);
    }

    await queryRunner.manager.save(grade);
    await queryRunner.commitTransaction();
    return grade;
  }

  /**
   * Retrieves paginated grades with filtering options.
   * @param {GetGradesQueryDto} payload - Query parameters for pagination.
   * @param {number} [studentId] - Optional student ID filter.
   * @returns {Promise<ReadPaginationContainerDto<Assignment>>} Paginated grades.
   */
  async findGradesPaginate(
    payload: GetGradesQueryDto,
    studentId?: number
  ): Promise<ReadPaginationContainerDto<Assignment>> {
    const paginated = await this.findPaginate<Assignment>({
      payload,
      repository: "gradeRepository",
      queryModifier(qb) {
        const { search } = payload;
        const query = qb
          .leftJoinAndSelect("grade.assignment", "assignment")
          .leftJoinAndSelect("assignment.student", "student")
          .leftJoinAndSelect("grade.teacher", "teacher");
        if (search) {
          query.andWhere(
            new Brackets((qb) => {
              qb.where("grade.feedback LIKE :search", {
                search: `%${search}%`,
              })
                .orWhere("teacher.name LIKE :search", {
                  search: `%${search}%`,
                })
                .orWhere("assignment.title LIKE :search", {
                  search: `%${search}%`,
                })
                .orWhere("assignment.content LIKE :search", {
                  search: `%${search}%`,
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

  /**
   * Uses AI to generate a grade and feedback for an assignment.
   * @param {number} assignmentId - The ID of the assignment to be graded.
   * @returns {Promise<ReadRecommendationWithAiDto>} The AI-generated grade and feedback.
   */
  async gradeAndFeedbackWithAi(
    assignmentId: number
  ): Promise<ReadRecommendationWithAiDto> {
    const assignment = await this.assignmentService.findById(assignmentId);
    let result = { grade: 0, feedback: "" };

    try {
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Grade this submission with a score between 1 and 10, decimals are allowed. Also, provide that encourages the student to explore deeper ideas while acknowledging their effort. Use a positive and motivational tone. Evaluate the correctness of the solution first. If the solution is correct but simple, still give a reasonable grade rather than a very low score. Consider the clarity and correctness of the response rather than just complexity. If the subject is Math, only consider accuracy. If the answer is fully correct with no mistakes, assign a perfect score of 10. Do not lower the score based on simplicity, complexity, or any other factor. For the end result, please return it in the exact following json format at the very end of your response, and replace the grade and feedback with your grade and feedback like this: \`const result={\"grade\":1.1,\"feedback\":\"AI Feedback\"}\`.\n\n\nSubject: ${assignment.subject}\n\nTitle: ${assignment.title}\n\n\nContent: ${assignment.content}`,
          },
        ],
      });
      const match = response.choices[0].message.content.match(
        /const result=(\{.*?\})/s
      );
      if (match && match[1]) {
        try {
          const parsedResult = JSON.parse(match[1]);
          result = parsedResult;
        } catch (error) {
          result = {
            grade: 10,
            feedback: "Failed to parse AI result",
          };
        }
      } else {
        result = {
          grade: 10,
          feedback: "No valid AI result",
        };
      }
    } catch (error: any) {
      result = {
        grade: 10,
        feedback:
          error.status === 429
            ? "Hang tight! The AI needs a short break. Try again in an hour!"
            : "No valid AI result",
      };
    }
    return result;
  }
}
