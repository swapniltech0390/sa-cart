import { Module } from '@nestjs/common';
import { NestUsersService } from './nest-users.service';
import { UsersResolver } from './users.resolver';
import {HttpModule} from '@nestjs/axios'; 

@Module({
  imports:[HttpModule],
  controllers: [],
  providers: [UsersResolver,NestUsersService],
  exports: [],
})
export class NestUsersModule {}
