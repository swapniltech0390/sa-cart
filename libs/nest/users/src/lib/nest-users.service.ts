import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../models/user';
import { createUserArgs } from '../dto/args/create-user.args';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class NestUsersService {
  uri:String = '';
  constructor(private configService:ConfigService,private readonly httpService: HttpService){
    this.uri = this.configService.get('SERVER_URI')!;
  }
  users: User[] = [  ];

  getUsers(): User[]{
    return this.users;
  };

  signUp(createUserArgs:createUserArgs): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef.post<any>(`${this.uri}/signup`,createUserArgs.user);
  }
}
