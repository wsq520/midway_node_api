import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('club_type')
export class Clubtype {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  club_type: string;
}
