/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskDto } from './dto/task.dto';
import {
  TaskPagingRequest,
  PaginatedResponse,
  TaskFilters,
} from './dto/pagination.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<TaskDto[]> {
    const tasks = await this.tasksRepository.find();
    return tasks.map((task) => this.transformTaskForResponse(task));
  }

  async getTasksPaging(
    request: TaskPagingRequest,
  ): Promise<PaginatedResponse<TaskDto>> {
    const { pagination, filters } = request;
    const { page, pageSize } = pagination;
    const queryBuilder = this.tasksRepository.createQueryBuilder('task');

    // Apply filters
    this.applyFilters(queryBuilder, filters);

    // Get total count for pagination
    const total = await queryBuilder.getCount();

    // Apply pagination
    queryBuilder.skip((page - 1) * pageSize).take(pageSize);

    // Execute query
    const tasks = await queryBuilder.getMany();

    // Transform tasks
    const transformedTasks = tasks.map((task) =>
      this.transformTaskForResponse(task),
    );

    // Calculate total pages
    const totalPages = Math.ceil(total / pageSize);

    return {
      data: transformedTasks,
      total,
      currentPage: page,
      totalPages,
      pageSize,
    };
  }

  private applyFilters(
    queryBuilder: ReturnType<Repository<Task>['createQueryBuilder']>,
    filters: TaskFilters,
  ): void {
    if (filters.status) {
      queryBuilder.andWhere('task.status = :status', {
        status: filters.status,
      });
    }

    if (filters.assignee) {
      queryBuilder.andWhere('task.assignee = :assignee', {
        assignee: filters.assignee,
      });
    }

    if (filters.project) {
      queryBuilder.andWhere('task.relatedProjects = :project', {
        project: filters.project,
      });
    }

    if (filters.department) {
      queryBuilder.andWhere('task.relatedDepartments = :department', {
        department: filters.department,
      });
    }

    if (filters.taskTypes && filters.taskTypes.length > 0) {
      queryBuilder.andWhere('task.taskType IN (:...taskTypes)', {
        taskTypes: filters.taskTypes,
      });
    }

    if (filters.months && filters.months.length > 0) {
      queryBuilder.andWhere(
        'MONTH(task.dueDate) IN (:...months)',
        {
          months: filters.months,
        },
      );
    }
  }

  async getTaskById(id: string): Promise<TaskDto> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error('Task not found');
    }
    return this.transformTaskForResponse(task);
  }

  async createTask(taskData: TaskDto): Promise<TaskDto> {
    const transformedData = this.transformTaskForStorage(taskData);
    const task = this.tasksRepository.create(transformedData);
    const savedTask = await this.tasksRepository.save(task);
    return this.transformTaskForResponse(savedTask);
  }

  async updateTask(id: string, taskData: Partial<TaskDto>): Promise<TaskDto> {
    const transformedData = this.transformTaskForStorage(taskData);
    await this.tasksRepository.update(id, transformedData);
    return this.getTaskById(id);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Task not found');
    }
  }

  private transformTaskForStorage(task: Partial<TaskDto>): Partial<Task> {
    const transformed = { ...task } as any;
    if (Array.isArray(transformed.relatedProjects)) {
      transformed.relatedProjects = JSON.stringify(transformed.relatedProjects);
    }
    if (Array.isArray(transformed.relatedDepartments)) {
      transformed.relatedDepartments = JSON.stringify(
        transformed.relatedDepartments,
      );
    }
    return transformed;
  }

  private transformTaskForResponse(task: Task): TaskDto {
    const transformed = { ...task };
    try {
      if (typeof transformed.relatedProjects === 'string') {
        transformed.relatedProjects = JSON.parse(transformed.relatedProjects);
      } else if (!Array.isArray(transformed.relatedProjects)) {
        transformed.relatedProjects = [];
      }
      if (typeof transformed.relatedDepartments === 'string') {
        transformed.relatedDepartments = JSON.parse(
          transformed.relatedDepartments as string,
        );
      } else if (!Array.isArray(transformed.relatedDepartments)) {
        transformed.relatedDepartments = [];
      }
    } catch (error) {
      console.error('Error parsing JSON fields:', error);
      transformed.relatedProjects = [];
      transformed.relatedDepartments = [];
    }
    return transformed as TaskDto;
  }
}
