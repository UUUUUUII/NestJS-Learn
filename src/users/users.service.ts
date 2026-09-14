import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  // 注入 User Repository，用于执行数据库操作。
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  // 创建 User 实体并保存到数据库。
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.pw = createUserDto.pw;
    user.role = createUserDto.role;
    user.active = createUserDto.active;
    return this.usersRepository.save(user);
  }

  // 查询全部用户。
  findAll() {
    return this.usersRepository.find();
  }

  // 根据用户 ID 查询单个用户。
  findOne(id: number) {
    if (isNaN(+id)) {
      // 通过异常对象传递业务错误编码和提示信息。
      throw new HttpException(
        {
          code: 'USER_ID_INVALID',
          message: '用户 ID 必须是有效数字',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.usersRepository.findOneBy({ id });
  }

  // 根据用户 ID 更新用户信息。
  update(id: number, updateUserDto: UpdateUserDto) {
    if (isNaN(+id)) {
      // ID 不是有效数字时终止数据库操作。
      throw new HttpException('BAD_REQUEST,id is not null', HttpStatus.BAD_REQUEST);
    }
    return this.usersRepository.update(id, updateUserDto);
  }

  // 根据用户 ID 删除用户。
  remove(id: number) {
    if (isNaN(+id)) {
      // ID 不是有效数字时终止数据库操作。
      throw new HttpException('BAD_REQUEST,id is not null', HttpStatus.BAD_REQUEST);
    }
    return this.usersRepository.delete(id);
  }
}
