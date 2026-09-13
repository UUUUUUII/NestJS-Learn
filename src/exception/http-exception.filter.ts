import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

type ErrorResponse = {
  code?: string | number;
  message?: string | string[];
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error =
      typeof exceptionResponse === 'string'
        ? { code: status, message: exceptionResponse }
        : (exceptionResponse as ErrorResponse);

    response.status(status).json({
      code: error.code ?? status,
      statusCode: status,
      message: error.message ?? '请求失败',
      path: request.url,
    });
  }
}
