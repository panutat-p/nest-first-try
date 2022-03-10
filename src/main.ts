import "source-map-support/register";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("main");
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // affect all controllers
  await app.listen(3000);
  logger.debug(await app.getUrl());
}

bootstrap();
