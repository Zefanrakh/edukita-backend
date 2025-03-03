import {
  FindManyOptions,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from "typeorm";
import { PaginationPayloadContainerDto } from "../dtos/pagination/PaginationPayload.dto";
import { Pagination } from "../types/pagination";
import { ReadPaginationContainerDto } from "../dtos/pagination/ReadPagination.dto";

export class PaginationService<S extends PaginationService<S>> {
  /**
   * Retrieves paginated results for a given repository.
   * @template T - The entity type being queried.
   * @template K - The type of pagination payload.
   * @param {Object} params - The pagination parameters.
   * @param {K} params.payload - The pagination input containing limits, sorting, etc.
   * @param {keyof S & string} params.repository - The repository key from the service.
   * @param {FindManyOptions<T> | null} [params.additionalQuery] - Additional TypeORM query options.
   * @param {(qb: SelectQueryBuilder<T>) => SelectQueryBuilder<T>} [params.queryModifier] - Function to modify the query.
   * @param {boolean} [params.useQueryBuilder=true] - Flag to determine query execution method.
   * @returns {Promise<ReadPaginationContainerDto<T>>} - A paginated response containing data, total, page count, etc.
   */
  protected async findPaginate<
    T extends ObjectLiteral,
    K extends PaginationPayloadContainerDto = PaginationPayloadContainerDto
  >({
    payload,
    repository,
    additionalQuery,
    queryModifier,
    useQueryBuilder = true,
  }: {
    payload: K;
    repository: keyof S & string;
    additionalQuery?: FindManyOptions<T> | null;
    queryModifier?: (qb: SelectQueryBuilder<T>) => SelectQueryBuilder<T>;
    useQueryBuilder?: boolean;
  }): Promise<ReadPaginationContainerDto<T>> {
    let paginationInput = payload.pagination;
    let typeormPagination: Pagination<T> | null = null;
    let page = 1;
    let take: number | undefined;
    let skip = 0;
    if (paginationInput) {
      const { limit, sortBy, sortOrder } = paginationInput;
      page = limit ? paginationInput.page || 1 : 1;
      take = limit;
      skip = take === undefined || take === null ? 0 : (page - 1) * take;
      const order = {
        [sortBy ?? "id"]: sortOrder ?? "DESC",
      } as Pagination<T>["order"];
      typeormPagination = {
        skip,
        take,
        order,
      };
    }

    const thatRepository = (this as unknown as S)[repository] as Repository<T>;
    let queryBuilder = thatRepository.createQueryBuilder(
      thatRepository.metadata.tableName
    );
    if (queryModifier) {
      queryBuilder = queryModifier(queryBuilder);
    }

    let result: [T[], number] | any = [[], 0];
    if (useQueryBuilder) {
      result = await queryBuilder
        .skip(typeormPagination?.skip)
        .take(typeormPagination?.take)
        .getManyAndCount();
    } else {
      result = await thatRepository.findAndCount({
        ...(typeormPagination && typeormPagination),
        ...(additionalQuery && additionalQuery),
      });
    }

    const data = result[0];
    const total = result[1];
    return {
      data,
      limit: take ?? total,
      page,
      total,
      totalPages: Math.ceil(total / (take ?? 1)),
    };
  }
}
