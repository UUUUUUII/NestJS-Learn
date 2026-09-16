import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Public } from './public.decorator.js';
import { HttpExceptionFilter } from '../exception/http-exception.filter.js';
import { errorResponse, successResponse } from '../utils/common.js';

@Controller()
export class AuthController {
  // 注入认证服务，后续可在服务中实现登录校验和令牌生成。
  constructor(private readonly authService: AuthService) {}

  // 登录接口是公开接口，不需要先通过认证守卫。
  @Public()
  @UseFilters(new HttpExceptionFilter())
  @Post('login')
  login(@Body() body: { name: string; pw: string }) {
    return this.authService
      .login(body?.name, body?.pw)
      .then((data) => successResponse(data, '登录成功'))
      .catch((err) => errorResponse(-1, err.message));
  }
}
