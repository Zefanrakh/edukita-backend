export class ReadPaginationDto {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class ReadPaginationContainerDto<T> extends ReadPaginationDto {
  data!: T[];
}
