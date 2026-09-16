export const successResponse = (data: any, message = '请求成功') => {
  return {
    code: 0,
    message,
    data,
  };
};

export const errorResponse = (
  code: number,
  message: string,
  data: any = null,
) => {
  return {
    code,
    data,
    message,
  };
};
