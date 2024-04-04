import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn({
    name: "student_id"
  })
  student_id: number;

  // 学号就是学生的账号
  @Column()
  xuehao: string;

  @Column()
  password: string;

  @Column()
  college: string;

  @Column()
  grade: string;

  @Column()
  major: string;

  @Column()
  classname: string;

  @Column()
  gender: string;

  @Column()
  phone: string;

  // @Column()
  // avatar: string;

  @Column()
  name: string;
}
