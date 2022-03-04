import { Injectable } from "@nestjs/common";
import { Task } from "./tasks.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    // No access modifier, public by default
    return this.tasks;
  }
}
