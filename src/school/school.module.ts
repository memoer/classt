import { Module } from '@nestjs/common';
import { SchoolService } from './application/school.service';
import { SchoolQueryResolver } from './resolver/school-query.resolver';

@Module({
  providers: [SchoolQueryResolver, SchoolService],
})
export class SchoolModule {}
