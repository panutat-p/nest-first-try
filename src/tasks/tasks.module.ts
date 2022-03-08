import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksRepository } from "./tasks.repository";

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository])], // inject TasksRepository into TasksModule
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
