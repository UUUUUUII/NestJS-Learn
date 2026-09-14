import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

type ErrorResponse = {
  // 业务错误编码，可以是数字或字符串。
  code?: string | number;
  // 返回给客户端的错误提示。
  message?: string | string[];
};

// 只处理 Nest 的 HTTP 异常，并统一响应格式。
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // 捕获异常并将统一格式写入 HTTP 响应。
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取当前 HTTP 请求上下文。
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // 读取 HTTP 状态码和异常携带的业务数据。
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // 兼容字符串异常和包含 code、message 的对象异常。
    const error =
      typeof exceptionResponse === 'string'
        ? { code: status, message: exceptionResponse }
        : (exceptionResponse as ErrorResponse);

    // 向客户端返回统一的错误响应结构。
    response.status(status).json({
      code: error.code ?? status,
      statusCode: status,
      message: error.message ?? '请求失败',
      path: request.url,
    });
  }
}
