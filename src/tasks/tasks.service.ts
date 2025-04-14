import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { ITaskDto } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  private arrayToString(arr: string[] | null | undefined): string {
    if (!arr || !Array.isArray(arr)) return '';
    return arr.join(',');
  }

  private stringToArray(str: string | null | undefined): string[] {
    if (!str) return [];
    return str.split(',').filter(Boolean);
  }

  private transformTaskToResponse(task: Task): ITaskDto {
    if (!task) {
      throw new Error('Cannot transform null task to response');
    }

    // Ensure we have valid data for arrays
    const relatedProjects = Array.isArray(task.relatedProjects)
      ? task.relatedProjects
      : this.stringToArray(task.relatedProjects as unknown as string);

    const relatedDepartments = Array.isArray(task.relatedDepartments)
      ? task.relatedDepartments
      : this.stringToArray(task.relatedDepartments as unknown as string);

    return {
      ...task,
      relatedProjects,
      relatedDepartments,
    };
  }

  async getAllTasks(): Promise<ITaskDto[]> {
    const tasks = await this.tasksRepository.find();
    return tasks.map((task) => this.transformTaskToResponse(task));
  }

  async getTaskById(id: string): Promise<ITaskDto> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return this.transformTaskToResponse(task);
  }

  async createTask(taskData: ITaskDto): Promise<ITaskDto> {
    try {
      // Ensure arrays are properly handled
      const task = this.tasksRepository.create({
        ...taskData,
        relatedProjects: this.arrayToString(taskData.relatedProjects),
        relatedDepartments: this.arrayToString(taskData.relatedDepartments),
      } as unknown as Task);

      const savedTask = await this.tasksRepository.save(task);
      return this.transformTaskToResponse(savedTask);
    } catch (error) {
      throw new Error(
        `Failed to create task: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async updateTask(id: string, taskData: Partial<ITaskDto>): Promise<ITaskDto> {
    try {
      // Ensure task exists before update
      const existingTask = await this.tasksRepository.findOne({
        where: { id },
      });
      if (!existingTask) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      const updateData: Partial<Task> = {
        ...taskData,
        ...(taskData.relatedProjects !== undefined && {
          relatedProjects: this.arrayToString(taskData.relatedProjects),
        }),
        ...(taskData.relatedDepartments !== undefined && {
          relatedDepartments: this.arrayToString(taskData.relatedDepartments),
        }),
      } as unknown as Partial<Task>;

      await this.tasksRepository.update(id, updateData);
      return this.getTaskById(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(
        `Failed to update task: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Task not found');
    }
  }
}
