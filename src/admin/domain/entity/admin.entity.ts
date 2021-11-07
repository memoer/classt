import { BaseEntity } from '@app/config';
import { Column, Entity, OneToMany } from 'typeorm';
import { AdminAuth } from './admin-auth.entity';

@Entity()
export class Admin extends BaseEntity {
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  name: string;
  @OneToMany(() => AdminAuth, (adminAuth) => adminAuth.admin)
  authList: AdminAuth[];
}
