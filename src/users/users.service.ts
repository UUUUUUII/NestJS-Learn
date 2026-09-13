import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.pw = createUserDto.pw;
    user.role = createUserDto.role;
    user.active = createUserDto.active;
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    if (isNaN(+id)) {
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

  update(id: number, updateUserDto: UpdateUserDto) {
    if (isNaN(+id)) {
      throw new HttpException('BAD_REQUEST,id is not null', HttpStatus.BAD_REQUEST);
    }
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    if (isNaN(+id)) {
      throw new HttpException('BAD_REQUEST,id is not null', HttpStatus.BAD_REQUEST);
    }
    return this.usersRepository.delete(id);
  }
}
