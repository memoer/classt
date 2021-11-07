import { Match, VALIDATION_MSG } from '@app/etc';
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateAdminInput {
  @Field((type) => String)
  @IsEmail()
  email: string;
  @Field((type) => String)
  @IsString()
  @MinLength(8, { message: VALIDATION_MSG.MIN_LENGTH({ name: 'password', length: 8 }) })
  @MaxLength(20, { message: VALIDATION_MSG.MAX_LENGTH({ name: 'password', length: 20 }) })
  @Matches(/^(?=.*\d)(?=.*[A-Za-z])(?=.*[^\w\d\s:])([^\s]){7,20}$/, {
    message: VALIDATION_MSG.PASSWORD,
  })
  password: string;
  @Field((type) => String)
  @IsString()
  @MinLength(8, { message: VALIDATION_MSG.MIN_LENGTH({ name: 'confirmPassword', length: 8 }) })
  @MaxLength(20, { message: VALIDATION_MSG.MAX_LENGTH({ name: 'confirmPassword', length: 20 }) })
  @Match('password', { message: 'confirmPassword :비밀번호가 일치하지 않습니다.' })
  confirmPassword: string;
  @Field((type) => String)
  @IsString()
  @MinLength(2, { message: VALIDATION_MSG.MIN_LENGTH({ name: 'name', length: 2 }) })
  @MaxLength(8, { message: VALIDATION_MSG.MAX_LENGTH({ name: 'name', length: 8 }) })
  name: string;
}
