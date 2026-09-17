import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './public.decorator.js';

@Injectable()
export class AuthGuard implements CanActivate {
  // Reflector 用于读取控制器和路由上的元数据。
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  // 返回 true 表示允许当前请求继续执行。
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 优先读取路由元数据，其次读取控制器元数据。
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
      cookies?: Record<string, string | undefined>;
      user?: unknown;
    }>();
    const authHeader = request.headers.authorization;
    const cookieToken = request.cookies?.access_token;

    if (
      !cookieToken &&
      (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer '))
    ) {
      throw new HttpException('请登录', HttpStatus.UNAUTHORIZED);
    }

    try {
      const token =
        cookieToken ?? (authHeader as string).replace('Bearer ', '').trim();
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload;
      return true;
    } catch {
      throw new HttpException('请登录', HttpStatus.UNAUTHORIZED);
    }
  }
}
