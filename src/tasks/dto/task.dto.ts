import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  taskType: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  priority: string;

  @ApiProperty({ required: false })
  startDate?: Date;

  @ApiProperty({ required: false })
  endDate?: Date;

  @ApiProperty({ required: false })
  dueDate?: Date;

  @ApiProperty()
  frequency: string;

  @ApiProperty({ required: false })
  result?: string;

  @ApiProperty({ type: String })
  relatedProjects: string;

  @ApiProperty({ type: String })
  relatedDepartments: string;

  @ApiProperty({ required: false })
  jiraId?: string;

  @ApiProperty()
  assignee: string;
}
