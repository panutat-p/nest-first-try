import { Test, TestingModule } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TasksRepository } from "./tasks.repository";
import { TaskStatus } from "./tasks-status.enum";
import { NotFoundException } from "@nestjs/common";

const mockTasksRepository = function () {
  return { getTasks: jest.fn(), findOne: jest.fn() };
};

describe("TasksService", function () {
  let tasksService: TasksService;
  let tasksRepository: any; // jest.Mocked<TasksRepository>

  beforeEach(async function () {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();
    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get<TasksRepository>(TasksRepository);
  });

  describe("getTasks", function () {
    it("calls TasksRepository.getTasks()", async function () {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();
      // test async function, use mockResolvedValue()
      tasksRepository.getTasks.mockResolvedValue("some-value");
    });
  });

  describe("getTasksById", function () {
    it("gets a task from TaskRepository", async function () {
      const mockTask = {
        title: "BTC",
        description: "perfect",
        id: "333",
        status: TaskStatus.OPEN,
      };

      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById("333");
      expect(result).toEqual(mockTask);
    });

    it("gets an NotFoundException from TasksRepository", async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      // we expect to get an NotFoundException from async function
      await expect(tasksService.getTaskById("333")).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
