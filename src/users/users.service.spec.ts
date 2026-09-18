import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('UsersService', () => {
  // 保存测试中需要调用的服务实例。
  let service: UsersService;

  // 每个测试前创建用户服务测试模块。
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: { user: {} },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  // 验证服务能够被 Nest 正常创建。
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
