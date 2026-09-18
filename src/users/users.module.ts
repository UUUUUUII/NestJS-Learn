import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';

@Module({
  // 注册用户控制器。
  controllers: [UsersController],
  // 注册用户业务服务。
  providers: [UsersService],
  exports: [UsersService],
})
// 用户模块聚合用户相关的控制器、服务和数据库实体。
export class UsersModule {}
