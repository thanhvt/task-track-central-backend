export interface ITask {
  id: string;
  taskType: string;
  title: string;
  content: string;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskDto
  extends Omit<ITask, 'relatedProjects' | 'relatedDepartments'> {
  relatedProjects: string[];
  relatedDepartments: string[];
}
