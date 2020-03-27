import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlgdbModule } from './algdb/algdb.module';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [AlgdbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
