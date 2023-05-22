import { Query, Resolver } from '@nestjs/graphql';
import { NestUsersService } from './nest-users.service';
import { User } from '../models/user';

@Resolver()
export class UsersResolver {
  constructor(private usersService: NestUsersService) {}

  @Query(() => [User!], { name: 'users' })
  getUsers() {
    return this.usersService.getUsers();
  }
}
