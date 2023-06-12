import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NestUsersService } from './nest-users.service';
import { User } from '../models/user';
import { createUserArgs } from '../dto/args/create-user.args';
import { LoginArgs } from '../dto/args/login-args';

@Resolver()
export class UsersResolver {
  constructor(private usersService: NestUsersService) {}

  @Query(() => [User!], { name: 'users',nullable:true })
  getUsers() {
    return this.usersService.getUsers();
  }

  @Mutation(()=> User,{name:'createUserProfile',nullable:true})
  async createUser(@Args() createUserArgs:createUserArgs){
    let {data} = await this.usersService.signUp(createUserArgs);
    return data.user;
  }

  @Query(() => User, { name: 'login',nullable:true })
  async login(@Args() loginArgs:LoginArgs) {
    let {data} = await this.usersService.login(loginArgs);
    return data.user;
  }

  @Query(() => String, { name: 'logout'})
  async logout() {
    let {data} = await this.usersService.logout();
    console.log('data  ',data);
    return data.error;
  }
}
