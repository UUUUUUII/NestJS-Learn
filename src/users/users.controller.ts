import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { HttpExceptionFilter } from '../exception/http-exception.filter.js';
import { Public } from '../auth/public.decorator.js';

@Controller('users')
export class UsersController {
  // 注入用户服务，将请求处理和业务逻辑分离。
  constructor(private readonly usersService: UsersService) {}

  // 创建用户。
  @Public()
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // 查询全部用户。
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // 根据 ID 查询单个用户，并使用自定义异常过滤器格式化错误。
  @Get(':id')
  @UseFilters(new HttpExceptionFilter())
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // 根据 ID 更新用户信息。
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // 根据 ID 删除用户。
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
