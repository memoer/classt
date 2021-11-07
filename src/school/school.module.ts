import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolHepler } from './application/lib/school.helper';
import { SchoolValidator } from './application/lib/school.validator';
import { SchoolService } from './application/service/school.service';
import { SchoolRepository } from './infra/school.repository';
import { SchoolMutationResolver } from './resolver/school-mutation.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolRepository])],
  providers: [
    // 표현
    SchoolMutationResolver,
    // 응용
    SchoolService,
    SchoolValidator,
    SchoolHepler,
  ],
})
export class SchoolModule {}
