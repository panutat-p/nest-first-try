import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TasksController } from "./tasks/tasks.controller";
import { TasksService } from "./tasks/tasks.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "arjuna.db.elephantsql.com",
      port: 5432,
      username: "siqubxqc",
      password: "", // 👈🏻 fill password here
      database: "siqubxqc",
      autoLoadEntities: true,
      synchronize: true, // auto migration
    }),
  ],
  controllers: [AppController, TasksController],
  providers: [AppService, TasksService],
})
export class AppModule {}
