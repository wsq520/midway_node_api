import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('grade')
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  grade: string;
}
