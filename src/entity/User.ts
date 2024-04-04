import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userName: string;

  @Column()
  age: number;
}
