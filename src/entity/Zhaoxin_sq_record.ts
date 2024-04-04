import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

// 该表只保存了哪些学生加入哪些社团的信息
@Entity('zhaoxinpublish')
export class Zhaoxinsqrecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'zhaoxin_pushlish_id',
  })
  zhaoxin_pushlish_id: number;

  @Column({
    name: 'club_id',
  })
  club_id: number;

  @Column({
    name: "student_id"
  })
  student_id: number;
}
