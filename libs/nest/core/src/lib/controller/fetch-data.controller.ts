import { Controller, Get } from '@nestjs/common';
import { FetchDataService } from '../service/fetch-data/fetch-data.service';

@Controller('fetch-data')
export class FetchDataController {
  constructor(private readonly fetchDataService: FetchDataService) {}
  @Get()
  getData() {
    return this.fetchDataService.getData();
  }
}
