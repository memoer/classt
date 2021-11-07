import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CoreEntity } from './core.entity';

export abstract class BaseEntity extends CoreEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp with time zone', select: false })
  updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true, select: false })
  deletedAt?: Date;

  isDeleted(): boolean {
    return this.deletedAt !== null;
  }
}
