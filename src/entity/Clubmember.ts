import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('clubmember')
export class Clubmember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "club_id"
  })
  club_id: number;


  @Column({
    name: "student_id"
  })
  student_id: number;

  @Column({
    name: "ispresident"
  })
  // 值为0或1 0不是社长 1是社长
  ispresident: number;

}
