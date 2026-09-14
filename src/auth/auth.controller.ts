import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Public } from './public.decorator.js';

@Controller()
export class AuthController {
  // 注入认证服务，后续可在服务中实现登录校验和令牌生成。
  constructor(private readonly authService: AuthService) {}

  // 登录接口是公开接口，不需要先通过认证守卫。
  @Public()
  @Post('login')
  login() {
    return "登录成功";
  }
}
