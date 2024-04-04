import { PrimaryGeneratedColumn,Column, Entity } from 'typeorm';

@Entity('admin_gonggao')
export class AdminGonggao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    name: "picture_url"
  })
  picture_url: string | undefined;

  @Column({
    name: "publishtime",
  })
  publishtime: string;
}
