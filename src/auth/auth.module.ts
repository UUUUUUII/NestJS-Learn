import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'dev-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  // 注册登录控制器。
  controllers: [AuthController],
  // 注册认证服务和全局认证守卫。
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [JwtModule],
})
// 认证模块负责组织认证相关的控制器、服务和守卫。
export class AuthModule {}
