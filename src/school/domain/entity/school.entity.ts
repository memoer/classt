import { BaseEntity } from '@app/config';
import { Column, Entity } from 'typeorm';

@Entity()
export class School extends BaseEntity {
  @Column()
  location: string;
  @Column()
  name: string;
}
