import { UpdateEntityArgs } from '@app/config';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  Unique,
} from 'typeorm';
import { Admin } from './admin.entity';

export enum AdminAuthType {
  CREATE_SCHOOL = 'create_school',
  UPDATE_SCHOOL = 'update_school',
  DELETE_SCHOOL = 'delete_school',
  CREATE_SCHOOL_NEWS = 'create_school_news',
  UPDATE_SCHOOL_NEWS = 'update_school_news',
  DELETE_SCHOOL_NEWS = 'delete_school_news',
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

  static createAdminAuth({ adminId, type }: UpdateEntityArgs<AdminAuth, 'admin'>): AdminAuth {
    const adminAuthEntity = new AdminAuth();
    if (adminId) {
      adminAuthEntity.adminId = adminId;
    }
    adminAuthEntity.type = type;
    return adminAuthEntity;
  }
}
