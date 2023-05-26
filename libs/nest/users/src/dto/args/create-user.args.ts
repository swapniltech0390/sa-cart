import { ArgsType, Field } from "@nestjs/graphql";
import {IsNotEmpty} from 'class-validator';
import { CreateUser } from "../models/create-user-input";

@ArgsType()
export class createUserArgs{
    @Field()
    @IsNotEmpty()
    user!: CreateUser;
}