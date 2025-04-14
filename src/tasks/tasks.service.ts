import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<TaskDto[]> {
    const tasks = await this.tasksRepository.find();
    return tasks.map(task => this.transformTaskForResponse(task));
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
      transformed.relatedDepartments = JSON.stringify(transformed.relatedDepartments);
    }
    return transformed;
  }

  private transformTaskForResponse(task: Task): TaskDto {
    const transformed = { ...task } as any;
    try {
      if (transformed.relatedProjects) {
        transformed.relatedProjects = JSON.parse(transformed.relatedProjects);
      } else {
        transformed.relatedProjects = [];
      }
      if (transformed.relatedDepartments) {
        transformed.relatedDepartments = JSON.parse(transformed.relatedDepartments);
      } else {
        transformed.relatedDepartments = [];
      }
    } catch (error) {
      console.error('Error parsing JSON fields:', error);
      transformed.relatedProjects = [];
      transformed.relatedDepartments = [];
    }
    return transformed;
  }
}
