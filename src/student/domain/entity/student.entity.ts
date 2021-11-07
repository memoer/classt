import { BaseEntity } from '@app/config';
import { Column, Entity } from 'typeorm';

export enum Gender {
  FEMALE = 'female',
  MALE = 'male',
}
@Entity()
export class Student extends BaseEntity {
  @Column()
  name: string;
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;
  @Column({ type: 'timestamp with time zone' })
  birthDate: Date;
  @Column()
  email: string;
  @Column()
  password: string;
}
