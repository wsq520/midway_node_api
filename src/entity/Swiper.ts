import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('swiper')
export class Swiper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'url',
  })
  url: string;

  @Column({
    name: 'desc',
  })
  desc: string;

  @Column({
    name: 'isShow',
  })
  isShow: number;
}
