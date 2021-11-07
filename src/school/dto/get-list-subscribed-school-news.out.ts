import { PaginationOutput } from '@app/config/graphql/core.dto';
import { ObjectType } from '@nestjs/graphql';
import { SchoolNewsModel } from './school-news.model';

@ObjectType()
export class GetListSubscribedSchoolNewsOutput extends PaginationOutput(SchoolNewsModel) {}
