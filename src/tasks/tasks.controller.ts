import { Body, Controller, Get, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./tasks.model";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() body, @Body() createTaskDto: CreateTaskDto): Task {
    // DTO help us when change JSON body, controller remain the same
    console.log("body:", body);
    return this.tasksService.createTask(createTaskDto);
  }
}
