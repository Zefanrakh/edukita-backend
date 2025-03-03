import { FindOptionsOrder } from "typeorm";

export interface Pagination<T> {
  skip: number;
  take?: number;
  order: FindOptionsOrder<T> | undefined;
}
