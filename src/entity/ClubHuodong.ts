import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('club_huodong')
export class ClubHuodong {
  @PrimaryGeneratedColumn({
    name: 'huodong_id'
  })
  huodong_id: number;

  @Column({
    name: 'club_id'
  })
  club_id: number;

  @Column({
    name: 'club_name'
  })
  club_name: string;

  @Column({
    name: 'club_type'
  })
  club_type: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  picture_url: string;

  @Column()
  status: number;

  @Column()
  starttime: string;

  @Column()
  endtime: string;
}
