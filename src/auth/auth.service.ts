import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service.js';

@Injectable()
// 认证业务服务，负责处理登录、令牌和用户身份校验。
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(name: string, pw: string): Promise<any> {
    // 这里可以实现登录逻辑，例如验证用户名和密码，生成 JWT 等。
    if (!name || !pw) {
      throw new HttpException('Name and password are required', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.findByName(name);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isValidPassword = await argon2.verify(user.pw, pw);

    if (!isValidPassword) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      name: user.name,
      role: user.role,
    });

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        active: user.active,
      },
    };
  }
}

