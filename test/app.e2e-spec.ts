import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  // 保存端到端测试使用的 Nest 应用实例。
  let app: INestApplication<App>;

  // 每个测试前加载完整应用模块并初始化 HTTP 服务。
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // 验证根路径能够返回应用欢迎文本。
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // 每个测试结束后关闭应用，释放端口和数据库等资源。
  afterEach(async () => {
    await app.close();
  });
});
