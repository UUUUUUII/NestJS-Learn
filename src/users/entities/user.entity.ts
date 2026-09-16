import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

// 将 User 类映射到数据库中的 users 表。
@Entity('users')
export class User {
  // 自增主键。
  @PrimaryGeneratedColumn()
  id: number;

  // 用户名，要求唯一。
  @Column()
  @Unique(['name'])
  name: string;

  // 用户密码，生产环境中应保存加密后的值。
  @Column()
  pw: string;

  // 用户角色。
  @Column()
  role: string;

  // 用户是否处于启用状态。
  @Column()
  active: number;
}
