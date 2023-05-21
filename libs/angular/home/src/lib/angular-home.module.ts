import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpLink } from 'apollo-angular/http';
import { RouterModule, Route } from '@angular/router';
import { angularHomeRoutes } from './lib.routes';
import { HomeComponent } from './components/home/home.component';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpClientModule } from '@angular/common/http';

const uri = 'http://localhost:3000/graphql';
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(angularHomeRoutes),
    HttpClientModule,
    ApolloModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class AngularHomeModule {}
