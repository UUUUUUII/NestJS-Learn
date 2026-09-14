import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';

@Module({
  // 将 User 实体的 Repository 注入当前模块。
  imports: [TypeOrmModule.forFeature([User])],
  // 注册用户控制器。
  controllers: [UsersController],
  // 注册用户业务服务。
  providers: [UsersService],
})
// 用户模块聚合用户相关的控制器、服务和数据库实体。
export class UsersModule {}
