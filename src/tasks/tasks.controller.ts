import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./tasks.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }

    return this.tasksService.getAllTasks();
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Task {
    console.log("id:", id);
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() body, @Body() createTaskDto: CreateTaskDto): Task {
    // DTO help us when change JSON body, controller remain the same
    console.log("body:", body);
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): Task {
    console.log("deleting id", id);
    return this.tasksService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: string,
    @Body("status") status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
