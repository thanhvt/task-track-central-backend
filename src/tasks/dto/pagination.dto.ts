export interface PaginationDto {
  page: number;
  pageSize: number;
}

export interface TaskFilters {
  status?: string;
  assignee?: string;
  project?: string;
  department?: string;
  taskTypes?: string[];
  months?: string[];
}

export interface TaskPagingRequest {
  pagination: PaginationDto;
  filters: TaskFilters;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}
