import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class FetchDataService {
  constructor(private readonly httpService: HttpService) {}
  getData(): Promise<AxiosResponse<{ message: string }>> {
    return this.httpService.axiosRef.get('http://localhost:3333/api');
}
}