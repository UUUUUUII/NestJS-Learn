import { SetMetadata } from "@nestjs/common";

// 用于在控制器或路由上标记“无需认证”。
export const IS_PUBLIC_KEY = 'isPublic';

// 将公开路由标记写入 Nest 元数据，供 AuthGuard 查询。
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);