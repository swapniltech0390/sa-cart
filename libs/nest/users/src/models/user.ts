import { Field, InputType, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class User {

  @Field()
  id!: string;

  @Field()
  firstname!: string;

  @Field()
  lastname!: string;
  
  @Field()
  email!: string;
  
  @Field()
  role!: 'ADMIN' | 'USER';
}

