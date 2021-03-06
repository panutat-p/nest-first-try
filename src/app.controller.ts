import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): string {
    return "root";
  }

  @Get("/hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/fruit")
  getJson(): any {
    return {
      data: {
        fruit: "apple",
        price: 23,
      },
    };
  }
}
