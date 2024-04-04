import { PrimaryGeneratedColumn,Column, Entity } from 'typeorm';

@Entity('club_gonggao')
export class ClubGonggao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  club_id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    name: "picture_url"
  })
  picture_url: string | undefined;

  @Column({
    name: "publishtime",
  })
  publishtime: string;

  @Column()
  status: number;
}
