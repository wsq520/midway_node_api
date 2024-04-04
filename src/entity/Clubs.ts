import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('clubs')
export class Clubs {
  @PrimaryGeneratedColumn({
    name: "club_id",
  })
  club_id: number;

  @Column({
    name: "student_id"
  })
  student_id: number;

  @Column()
  club_name: string;

  @Column({
    name: "club_type"
  })
  club_type: string;

  @Column()
  introduction: string;

  @Column()
  views: number;

  @Column()
  avatar: string;
}
