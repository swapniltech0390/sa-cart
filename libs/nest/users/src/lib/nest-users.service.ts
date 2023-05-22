import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/user';


@Injectable()
export class NestUsersService {
  users: User[] = [
    {
      userId: uuidv4(),
      email: 'swapniltech0390@gmail.com',
      role: 'ADMIN',
    },
    {
      userId: uuidv4(),
      email: 'swarnim@gmail.com',
      role: 'USER',
    },
  ];

  getUsers(): User[]{
    return this.users;
  };
}
