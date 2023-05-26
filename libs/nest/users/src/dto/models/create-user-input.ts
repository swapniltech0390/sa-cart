import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUser {
  @Field()
  firstname!: string;

  @Field()
  lastname!: string;
  
  @Field()
  email!: string;
  
  @Field()
  password!: string;
  
  @Field()
  password2?: string;
  
  @Field()
  role!: 'ADMIN' | 'USER';
}