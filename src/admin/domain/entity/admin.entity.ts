import { BaseEntity } from '@app/config';
import { Column, Entity } from 'typeorm';

@Entity()
export class AdminEntity extends BaseEntity {
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  name: string;
}
