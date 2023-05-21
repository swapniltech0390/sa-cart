import { Injectable } from '@angular/core';
import { Apollo, QueryRef, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private fetchData: QueryRef<{ uptime: String }>;
  constructor(private apollo: Apollo) {
    this.fetchData = this.apollo.watchQuery({
      query: gql`
        query {
          uptime
        }
      `,
    });
  }

  async fetchDataObj(): Promise<any> {
    const result = await this.fetchData.refetch();
    return result.data.uptime;
  }
}
