import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('tcollege')
export class TCollege {
  @PrimaryGeneratedColumn()
  college_id: number;

  @Column()
  college_name: string;

  @Column()
  grade_id: number;
}
