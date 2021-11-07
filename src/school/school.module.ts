import { Module } from '@nestjs/common';
import { SchoolService } from './application/school.service';
import { SchoolMutationResolver } from './resolver/school-mutation.resolver';

@Module({
  providers: [SchoolMutationResolver, SchoolService],
})
export class SchoolModule {}
