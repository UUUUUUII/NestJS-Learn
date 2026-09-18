import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // 注册 Observe 模块，为应用提供链路追踪、日志和指标采集能力。
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? '',
      appSecret: process.env.OBSERVE_APP_SECRET ?? '',
      serviceId: 'nest-typescript-starter',
    }),
    // 注册 Prisma 客户端并管理数据库连接生命周期。
    PrismaModule,
    // 注册用户模块。
    UsersModule,
    // 注册认证模块，其中包含全局认证守卫。
    AuthModule,
  ],
  // 注册应用级控制器。
  controllers: [AppController],
  // 注册应用级服务。
  providers: [AppService],
})
export class AppModule {}
