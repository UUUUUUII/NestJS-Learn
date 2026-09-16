// 创建用户接口接收的数据结构。
export class CreateUserDto {
    // 用户名。
    name: string;
    // 用户密码。
    pw: string;
    // 用户角色。
    role: string;
    // 用户是否启用。
    active: number;
}
