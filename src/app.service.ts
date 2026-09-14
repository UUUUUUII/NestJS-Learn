import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // 返回应用首页的示例文本。
  getHello(): string {
    return 'Hello World!';
  }
}
