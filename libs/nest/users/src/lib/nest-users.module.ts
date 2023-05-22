import { Module } from '@nestjs/common';
import { NestUsersService } from './nest-users.service';
import { UsersResolver } from './users.resolver';

@Module({
  controllers: [],
  providers: [UsersResolver,NestUsersService],
  exports: [],
})
export class NestUsersModule {}
