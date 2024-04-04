import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('tgrade')
export class TGrade {
  @PrimaryGeneratedColumn()
  grade_id: number;

  @Column()
  grade_name: string;
}
