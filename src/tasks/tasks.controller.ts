import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { rowAffected, TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status-dto";
import { Task } from "./task.entity";
import { AuthGuard } from "@nestjs/passport";
import { Logger } from "@nestjs/common";

@Controller("tasks")
// @UseGuards(AuthGuard()) // Authorization
export class TasksController {
  private logger = new Logger("TasksController");

  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    this.logger.verbose(
      `getAllTasks | filterDto: ${JSON.stringify(filterDto)}`,
    );
    return this.tasksService.getAllTasks(filterDto);
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Promise<Task> {
    this.logger.verbose(`getTaskById | id: ${id}`);
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    this.logger.verbose(
      `createTas | createTaskDto: ${JSON.stringify(createTaskDto)}`,
    );
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard())
  deleteTask(@Param("id") id: string): Promise<rowAffected> {
    this.logger.verbose(`deleteTask | id: ${id}`);
    return this.tasksService.deleteTask(id);
  }

  @Patch("/:id/status")
  @UseGuards(AuthGuard())
  updateTaskStatus(
    @Param("id") id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    this.logger.verbose(
      `updateTaskStatus | id: ${id}, updateTaskStatusDto: ${JSON.stringify(
        updateTaskStatusDto,
      )}`,
    );
    const { status } = updateTaskStatusDto;

    return this.tasksService.updateTaskStatus(id, status);
  }
}
