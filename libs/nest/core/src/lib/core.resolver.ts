import { Float, Query, Resolver } from '@nestjs/graphql';
import { FetchDataService } from './service/fetch-data/fetch-data.service';

@Resolver()
export class CoreResolver {
  constructor(private fetchDataService: FetchDataService){};
  @Query(() => String)
 async uptime() {
    let { data } = await this.fetchDataService.getData().then();
    return data.message;
  }
}