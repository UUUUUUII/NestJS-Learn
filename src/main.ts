import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule, ObserveInstrument } from './app.module.js';

// 创建 Nest 应用并启动 HTTP 服务。
async function bootstrap() {
  // 使用根模块创建应用，同时接入 Observe 监控能力。
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.use(cookieParser());

  // 优先使用环境变量中的端口，没有配置时使用 3000。
  await app.listen(process.env.PORT ?? 3000);
}

// 启动应用。
await bootstrap();
