import { Resolver } from '@nestjs/graphql';
import { SchoolService } from '../application/school.service';

@Resolver()
export class SchoolQueryResolver {
  constructor(private readonly schoolService: SchoolService) {}
}
