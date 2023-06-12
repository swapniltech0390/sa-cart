import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver } from '@nestjs/apollo';
import { NestUsersModule } from '@sa-cart/nest/users';
import { configuration } from '../config/configuration';
import { validationSchema } from '../config/validation';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
       context: ({ req, res }: { req: Request; res: Response }) => ({
              request: req
            }),
      driver: ApolloDriver,
      cors: {
        credentials: true,
        origin: ['http://localhost:3000'],
      },
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error && error.message
        };
        return graphQLFormattedError;
      }
    }),
    NestUsersModule,
  ],
})
export class AppModule {}
