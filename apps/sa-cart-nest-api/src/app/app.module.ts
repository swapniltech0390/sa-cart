import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestCoreModule } from '@sa-cart/nest/core';

@Module({
  imports: [NestCoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
