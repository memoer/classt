import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { AdminAuth } from '../domain/entity/admin-auth.entity';
import { AdminAuthModel } from '../dto/admin-auth.model';

@Injectable()
export class AdminAuthDAO {
  constructor(@InjectConnection() private readonly dbConn: Connection) {}

  async findMany(adminId: number): Promise<AdminAuthModel[]> {
    const authList = await this.dbConn
      .createQueryBuilder()
      .from(AdminAuth, 'admin_auth')
      .where('admin_auth.adminId = :adminId', { adminId })
      .getMany();
    return plainToClass(AdminAuthModel, authList);
  }
}
