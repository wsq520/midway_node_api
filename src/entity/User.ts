import { Column, Entity } from 'typeorm';

@Entity('user')
export class User {
  @Column({
    primary: true,
  })
  id: string;

  @Column()
  userName: string;

  @Column()
  age: number;
}
