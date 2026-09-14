import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';

// 更新用户时复用创建用户字段，并将所有字段改为可选。
export class UpdateUserDto extends PartialType(CreateUserDto) {}
