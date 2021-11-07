import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolNewsHelper } from './application/lib/school-news.helper';
import { SchoolNewsValidator } from './application/lib/school-news.validator';
import { SchoolHelper } from './application/lib/school.helper';
import { SchoolValidator } from './application/lib/school.validator';
import { SchoolNewsService } from './application/service/school-news.service';
import { SchoolService } from './application/service/school.service';
import { SchoolNewsRepository } from './infra/school-news.repository';
import { SchoolRepository } from './infra/school.repository';
import { SchoolMutationResolver } from './resolver/school-mutation.resolver';
import { SchoolNewsMutationResolver } from './resolver/school-news-mutation.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolRepository, SchoolNewsRepository])],
  providers: [
    // 표현
    SchoolMutationResolver,
    SchoolNewsMutationResolver,
    // 응용
    SchoolService,
    SchoolValidator,
    SchoolHelper,
    SchoolNewsService,
    SchoolNewsValidator,
    SchoolNewsHelper,
  ],
})
export class SchoolModule {}
