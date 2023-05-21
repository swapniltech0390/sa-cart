import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { CoreResolver } from './core.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
  ],
  controllers: [],
  providers: [CoreResolver],
  exports: [],
})
export class NestCoreModule {}
