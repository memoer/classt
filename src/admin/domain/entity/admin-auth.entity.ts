import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Admin } from './admin.entity';

export enum AdminAuthType {
  CREATE_SCHOOL = 'CREATE_SCHOOL',
  DELETE_SCHOOL = 'DELETE_SCHOOL',
  UPDATE_SCHOOL = 'UPDATE_SCHOOL',
  ALL_SCHOOL = 'ALL_SCHOOL',
}

@Entity()
export class AdminAuth {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column({ type: 'enum', enum: AdminAuthType })
  type: AdminAuthType;
  @Column({ type: 'bigint' })
  @RelationId((adminAuth: AdminAuth) => adminAuth.admin)
  adminId: string;
  @ManyToOne(() => Admin, (admin) => admin.authList)
  @JoinColumn()
  admin: Admin;
}
