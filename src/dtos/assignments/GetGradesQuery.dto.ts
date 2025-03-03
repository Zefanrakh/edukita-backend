import { IsOptional, IsString } from "class-validator";
import { PaginationPayloadContainerDto } from "../pagination/PaginationPayload.dto";
import { Type } from "class-transformer";

export class GetGradesQueryDto extends PaginationPayloadContainerDto {
  @IsOptional()
  @IsString()
  @Type(() => String)
  search?: string;
}
