import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';

@Injectable()
// 认证业务服务，负责处理登录、令牌和用户身份校验。
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async login(name: string, pw: string): Promise<any> {
    // 这里可以实现登录逻辑，例如验证用户名和密码，生成 JWT 等。
    if (!name || !pw) {
      throw new HttpException('Name and password are required', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userService.findByName(name);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!user.pw || user.pw !== pw) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
