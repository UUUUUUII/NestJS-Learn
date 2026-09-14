import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator.js';

@Injectable()
export class AuthGuard implements CanActivate {
  // Reflector 用于读取控制器和路由上的元数据。
  constructor(private readonly reflector: Reflector) {}

  // 返回 true 表示允许当前请求继续执行。
  canActivate(context: ExecutionContext): boolean {
    // 优先读取路由元数据，其次读取控制器元数据。
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true; // 如果是公共路由，直接放行
    }

    // 获取 HTTP 请求中的 Authorization 请求头。
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    // TODO: 校验 token，校验成功后再返回 true。
    return false;
  }
}
