import { BaseEntity } from '@app/config';
import { Column, Entity, OneToMany } from 'typeorm';
import { AdminAuth, AdminAuthType } from './admin-auth.entity';

@Entity()
export class Admin extends BaseEntity {
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  name: string;
  @OneToMany(() => AdminAuth, (adminAuth) => adminAuth.admin, { cascade: true })
  authList: AdminAuth[];

  addAuth(authTypeList: AdminAuthType[]): void {
    const newAuthList = authTypeList.filter(
      (newAuthType) => !this.authList.some((auth) => auth.type === newAuthType),
    );
    this.authList = this.authList.concat(
      newAuthList.map((type) => AdminAuth.createAdminAuth({ adminId: this.id, type })),
    );
  }

  deleteAuth(authTypeList: AdminAuthType[]): void {
    this.authList = this.authList.filter((auth) => !authTypeList.includes(auth.type));
  }
}
