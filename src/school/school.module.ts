import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from '../notification/notification.module';
import { SchoolNewsHelper } from './application/lib/school-news.helper';
import { SchoolHelper } from './application/lib/school.helper';
import { SchoolNewsService } from './application/service/school-news.service';
import { SchoolService } from './application/service/school.service';
import { SchoolNewsEvent } from './infra/schoo-news.event';
import { SchoolNewsDAO } from './infra/school-news.dao';
import { SchoolNewsRepository } from './infra/school-news.repository';
import { SchoolDAO } from './infra/school.dao';
import { SchoolRepository } from './infra/school.repository';
import { SchoolMutationResolver } from './resolver/school-mutation.resolver';
import { SchoolNewsMutationResolver } from './resolver/school-news-mutation.resolver';
import { SchoolNewsQueryResolver } from './resolver/school-news-query.resolver';
import { SchoolQueryResolver } from './resolver/school-query.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolRepository, SchoolNewsRepository]), NotificationModule],
  providers: [
    // 표현
    SchoolMutationResolver,
    SchoolNewsMutationResolver,
    SchoolNewsQueryResolver,
    SchoolQueryResolver,
    // 응용
    SchoolService,
    SchoolHelper,
    SchoolNewsService,
    SchoolNewsHelper,
    // 인프라
    SchoolNewsDAO,
    SchoolDAO,
    SchoolNewsEvent,
  ],
})
export class SchoolModule {}
