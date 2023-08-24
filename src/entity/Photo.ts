import { Column, Entity } from 'typeorm';

@Entity('photo')
export class Photo {
  @Column({
    primary: true,
  })
  id: string;

  @Column()
  name: string;

  @Column({
    name: 'user_id',
  })
  userId: string;
}
