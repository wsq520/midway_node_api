import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('college')
export class College {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "college"
  })
  college: string;
}
