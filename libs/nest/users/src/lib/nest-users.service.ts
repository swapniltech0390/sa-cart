import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../models/user';
import { createUserArgs } from '../dto/args/create-user.args';
import { HttpService } from '@nestjs/axios';
import { LoginArgs } from '../dto/args/login-args';
import { Observable } from 'rxjs';

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

  signUp(createUserArgs:createUserArgs): Observable<any> {
    return this.httpService.post<any>(`${this.uri}/signup`,createUserArgs.user);
  }
  login(loginArgs:LoginArgs): Observable<any>{
    return this.httpService.post<any>(`${this.uri}/login`,loginArgs,{withCredentials:true});
  }
  logout():Observable<any>{
    return this.httpService.delete<any>(`${this.uri}/logout`,{withCredentials:true});
  }
}
