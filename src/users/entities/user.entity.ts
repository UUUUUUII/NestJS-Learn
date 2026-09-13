import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Unique(['name'])
  name: string;
  @Column()
  pw: string;
  @Column()
  role: string;
  @Column()
  active: boolean;
}
