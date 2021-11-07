import { AuthGuardOf, CurrentUser } from '@app/etc';
import { GetTokenInput } from '@app/util/dto/get-token.in';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { AdminService } from '../application/service/admin.service';
import { Admin } from '../domain/entity/admin.entity';
import { AdminModel } from '../dto/admin.model';

@Resolver((of) => AdminModel)
export class AdminQueryResolver {
  constructor(private readonly adminService: AdminService) {}

  @Query((returns) => String, { name: 'getAdminToken' })
  getToken(@Args('input') input: GetTokenInput): Promise<string> {
    return this.adminService.getToken(input);
  }

  @Query((returns) => AdminModel, { name: 'getMyAdminInfo' })
  @AuthGuardOf('ADMIN')
  getMyInfo(@CurrentUser() me: Admin): AdminModel {
    return plainToClass(AdminModel, me);
  }
}
