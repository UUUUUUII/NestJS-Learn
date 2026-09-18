import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { User } from '@prisma/client';

@Injectable()
export class UsersService {
  // 注入 Prisma 客户端，用于执行数据库操作。
  constructor(private readonly prisma: PrismaService) {}

  // 创建 User 实体并保存到数据库。
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, pw, role, active } = createUserDto || {};
    if (!name || !pw) {
      throw new HttpException(
        'Name and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prisma.user.create({
      data: {
        name,
        pw: await argon2.hash(pw),
        role: role || 'user',
        active: active ?? 1,
      },
    });
  }

  // 查询全部用户。
  findAll() {
    return this.prisma.user.findMany();
  }

  // 根据用户 ID 查询单个用户。
  findOne(id: number) {
    if (Number.isNaN(Number(id))) {
      // 通过异常对象传递业务错误编码和提示信息。
      throw new HttpException(
        {
          code: 'USER_ID_INVALID',
          message: '用户 ID 必须是有效数字',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prisma.user.findUnique({ where: { id } });
  }

  // 根据用户 ID 更新用户信息。
  update(id: number, updateUserDto: UpdateUserDto) {
    if (Number.isNaN(Number(id))) {
      // ID 不是有效数字时终止数据库操作。
      throw new HttpException(
        'BAD_REQUEST,id is not null',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  // 根据用户 ID 删除用户。
  remove(id: number) {
    if (Number.isNaN(Number(id))) {
      // ID 不是有效数字时终止数据库操作。
      throw new HttpException(
        'BAD_REQUEST,id is not null',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prisma.user.delete({ where: { id } });
  }

  findByName(name: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { name } });
  }
}
