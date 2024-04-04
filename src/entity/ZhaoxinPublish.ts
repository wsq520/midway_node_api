import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

// 该表只保存了发布招新信息的数据 不涉及到学生加入的信息
@Entity('zhaoxin')
export class ZhaoxinPublish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'club_id',
  })
  club_id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    name: "picture_url"
  })
  picture_url: string | undefined;

  @Column()
  status: number;

  @Column()
  starttime: string;

  @Column()
  endtime: string;
}
