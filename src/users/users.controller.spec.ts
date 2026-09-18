import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('UsersController', () => {
  // 保存测试中需要调用的控制器实例。
  let controller: UsersController;

  // 每个测试前创建用户控制器测试模块。
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: { user: {} },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  // 验证控制器能够被 Nest 正常创建。
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
