import { ApiProperty } from '@nestjs/swagger';
import {
  PaginationDto,
  TaskFilters,
  TaskPagingRequest,
  PaginatedResponse,
} from './pagination.dto';
import { TaskDto } from './task.dto';

export class PaginationDtoSwagger implements PaginationDto {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 36 })
  pageSize: number;
}

export class TaskFiltersSwagger implements TaskFilters {
  @ApiProperty({ example: 'todo' })
  status?: string;

  @ApiProperty({ example: 'nampc' })
  assignee?: string;

  @ApiProperty({ example: 'p6' })
  project?: string;

  @ApiProperty({ example: 'd1' })
  department?: string;

  @ApiProperty({ example: ['maintenance', 'meeting', 'development'] })
  taskTypes?: string[];

  @ApiProperty({ example: ['3', '4', '7', '10', '6', '9'] })
  months?: string[];
}

export class TaskPagingRequestSwagger implements TaskPagingRequest {
  @ApiProperty({ type: PaginationDtoSwagger })
  pagination: PaginationDto;

  @ApiProperty({ type: TaskFiltersSwagger })
  filters: TaskFilters;
}

export class PaginatedResponseSwagger implements PaginatedResponse<TaskDto> {
  @ApiProperty({ type: [TaskDto] })
  data: TaskDto[];

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ example: 3 })
  totalPages: number;

  @ApiProperty({ example: 36 })
  pageSize: number;
}
