import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('admin')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account: string;

  @Column()
  password: string;

  @Column()
  nickname: string;
}
