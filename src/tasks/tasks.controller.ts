/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/task.dto';
import { TaskPagingRequest, PaginatedResponse } from './dto/pagination.dto';
import {
  TaskPagingRequestSwagger,
  PaginatedResponseSwagger,
} from './dto/pagination.swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Return all tasks',
    type: [TaskDto],
  })
  async getAllTasks(): Promise<TaskDto[]> {
    try {
      return await this.tasksService.getAllTasks();
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('tasksPaging')
  @ApiOperation({ summary: 'Get paginated tasks with filters' })
  @ApiBody({ type: TaskPagingRequestSwagger })
  @ApiResponse({
    status: 200,
    description: 'Return paginated tasks with filters',
    type: PaginatedResponseSwagger,
  })
  async getTasksPaging(
    @Body() request: TaskPagingRequest,
  ): Promise<PaginatedResponse<TaskDto>> {
    try {
      return await this.tasksService.getTasksPaging(request);
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by id' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Return the task', type: TaskDto })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async getTaskById(@Param('id') id: string): Promise<TaskDto> {
    try {
      return await this.tasksService.getTaskById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: TaskDto })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created',
    type: TaskDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createTask(@Body() taskData: TaskDto): Promise<TaskDto> {
    try {
      return await this.tasksService.createTask(taskData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiBody({ type: TaskDto })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated',
    type: TaskDto,
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async updateTask(
    @Param('id') id: string,
    @Body() taskData: Partial<TaskDto>,
  ): Promise<TaskDto> {
    try {
      return await this.tasksService.updateTask(id, taskData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async deleteTask(@Param('id') id: string): Promise<void> {
    try {
      await this.tasksService.deleteTask(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
