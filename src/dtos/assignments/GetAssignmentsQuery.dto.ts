import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationPayloadContainerDto } from "../pagination/PaginationPayload.dto";
import { Type } from "class-transformer";
import { Subject } from "../../entities/assignment";

export class GetAssignmentsQueryDto extends PaginationPayloadContainerDto {
  @IsOptional()
  @IsString()
  @Type(() => String)
  search?: string;

  @IsOptional()
  @IsEnum(Subject)
  subject?: Subject;
}
