import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./tasks-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TasksRepository } from "./tasks.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";

/*
https://typeorm.io/#/repository-api
 */

@Injectable()
export class TasksService {
  private logger = new Logger("TasksService", true);
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository, // child class of TypeORM
  ) {}

  async getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  /*
  now handle error when found no item
   */
  async getTaskById(id: string): Promise<Task> {
    const tasks = await this.tasksRepository.findOne(id);

    if (!tasks) {
      this.logger.error(`no task with id: ${id}`);
      throw new NotFoundException(`Task not found, id: ${id}`);
    }

    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    // declare method in TasksRepository because this operation includes custom query code
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<rowAffected> {
    const result = await this.tasksRepository.delete(id); // delete one or many

    if (result.affected === 0) {
      throw new NotFoundException(`Task not found, cannot delete, id: ${id}`);
    }

    return { rowAffected: result.affected };
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}

export interface rowAffected {
  rowAffected: number;
}
