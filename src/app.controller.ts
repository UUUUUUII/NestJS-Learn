import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  // 注入应用服务，由服务负责提供具体业务结果。
  constructor(private readonly appService: AppService) {}

  // 处理根路径 GET 请求。
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
