import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('tclass')
export class TClass {
  @PrimaryGeneratedColumn()
  class_id: number;

  @Column()
  class_name: string;

  @Column()
  major_id: number;
}
