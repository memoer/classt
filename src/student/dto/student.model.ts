import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Gender } from '../domain/entity/student.entity';

registerEnumType(Gender, { name: 'gender' });

@ObjectType()
export class StudentModel {
  @Field((type) => Int)
  id: number;
  @Field((type) => String)
  name: string;
  @Field((type) => Gender)
  gender: Gender;
  @Field((type) => Date)
  birthDate: Date;
  @Field((type) => String)
  email: string;
}
