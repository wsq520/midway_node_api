import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('major')
export class Major {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  major: string;

  @Column({
    name: "college_id"
  })
  college_id: number;
}
