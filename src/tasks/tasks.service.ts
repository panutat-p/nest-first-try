import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./tasks.model";
import { v4 as uuid } from "uuid";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    // No access modifier, public by default
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      // search for task status
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        // search in both title and description
        return task.title.includes(search) || task.description.includes(search);
      });
    }
    return tasks;
  }

  /*
  now handle error when found no item
   */
  getTaskById(id: string): Task {
    const result = this.tasks.find((task) => task.id === id);

    if (!result) {
      throw new NotFoundException(`task not found, id: ${id}`); // Pipe exception, affect HTTP status code
    }

    return result;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto; // destructuring

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): Task {
    const result = this.getTaskById(id); // handle error
    this.tasks = this.tasks.filter((task) => task.id !== result.id);

    return result;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id); // handle error
    task.status = status;
    return task;
  }
}
