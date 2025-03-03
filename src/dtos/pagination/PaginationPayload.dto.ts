import { Type } from "class-transformer";
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class PaginationPayloadDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsString()
  @Type(() => String)
  sortBy?: string;

  @IsOptional()
  @IsIn(["ASC", "DESC"], { message: "sortOrder must be 'ASC' or 'DESC'" })
  @Type(() => String)
  sortOrder?: "ASC" | "DESC";
}

export class PaginationPayloadContainerDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationPayloadDto)
  pagination?: PaginationPayloadDto;
}
