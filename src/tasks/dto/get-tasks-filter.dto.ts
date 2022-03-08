import { TaskStatus } from "../tasks-status.enum";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class GetTasksFilterDto {
  // without IsOptional()
  // request must include filter in the URL

  @IsOptional()
  @IsEnum(TaskStatus) // invalid status in the request body will get error
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
