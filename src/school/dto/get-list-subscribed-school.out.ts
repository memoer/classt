import { PaginationOutput } from '@app/config/graphql/core.dto';
import { ObjectType } from '@nestjs/graphql';
import { SchoolModel } from './school.model';

@ObjectType()
export class GetListSubscribedSchoolOutput extends PaginationOutput(SchoolModel) {}
