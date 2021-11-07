import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.in';

@InputType()
export class UpdateStudentInput extends PartialType(CreateStudentInput) {}
