import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  Unique,
} from 'typeorm';
import { CreateAdminAuthArgs } from '../../dto/admin-auth.dto';
import { Admin } from './admin.entity';

export enum AdminAuthType {
  CREATE_SCHOOL = 'create_school',
  UPDATE_SCHOOL = 'update_school',
  DELETE_SCHOOL = 'delete_school',
}

@Entity()
@Unique(['adminId', 'type'])
export class AdminAuth {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column({ type: 'enum', enum: AdminAuthType })
  type: AdminAuthType;
  @Column({ type: 'bigint' })
  @RelationId((adminAuth: AdminAuth) => adminAuth.admin)
  adminId: number;
  @ManyToOne(() => Admin, (admin) => admin.authList, { orphanedRowAction: 'delete' })
  @JoinColumn()
  admin: Admin;

  static createAdminAuth({ adminId, authType }: CreateAdminAuthArgs): AdminAuth {
    const adminAuthEntity = new AdminAuth();
    if (adminId) {
      adminAuthEntity.adminId = adminId;
    }
    adminAuthEntity.type = authType;
    return adminAuthEntity;
  }
}
