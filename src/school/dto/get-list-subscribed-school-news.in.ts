import { PaginationInputBySkip } from '@app/config/graphql/core.dto';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetListSubscribedSchoolNewsInput extends PaginationInputBySkip {
  @Field((type) => Int)
  schoolId: number;
}
