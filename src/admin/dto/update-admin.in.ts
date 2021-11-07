import { InputType, PartialType } from '@nestjs/graphql';
import { CreateAdminInput } from './create-admin.in';

@InputType()
export class UpdateAdminInput extends PartialType(CreateAdminInput) {}
