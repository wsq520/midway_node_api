import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('land')
export class Land {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column({
    name: "picture_url"
  })
  picture_url: string;

  @Column()
  status: string;
}
