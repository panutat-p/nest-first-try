import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksModule } from "./tasks/tasks.module";

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
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
