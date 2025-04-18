export class TaskDto {
  id?: string;
  taskType: string;
  title: string;
  taskContent: string;
  status: string;
  priority: string;
  startDate?: Date;
  endDate?: Date;
  dueDate?: Date;
  frequency: string;
  result?: string;
  relatedProjects: string[];
  relatedDepartments: string[];
  jiraId?: string;
  assignee: string;
  createdAt?: Date;
  updatedAt?: Date;
  mandays: string;
}
