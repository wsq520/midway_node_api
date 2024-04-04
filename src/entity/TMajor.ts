import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('tmajor')
export class TMajor {
  @PrimaryGeneratedColumn()
  major_id: number;

  @Column()
  major_name: string;

  @Column()
  college_id: number;
}
