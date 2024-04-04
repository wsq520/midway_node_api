import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('club_account_registry')
export class ClubAccountRegistry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'student_id'
  })
  student_id: number

  @Column()
  club_name: string;

  @Column()
  club_type: string;

  @Column()
  status: number;
}
