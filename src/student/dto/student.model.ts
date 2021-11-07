import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Gender } from '../domain/entity/student.entity';

registerEnumType(Gender, { name: 'gender' });

@ObjectType()
export class StudentModel {
  @Field()
  name: string;
  @Field()
  gender: Gender;
  @Field()
  birthDate: Date;
  @Field()
  email: string;
}
