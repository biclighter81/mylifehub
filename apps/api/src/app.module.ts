import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './datasource';

@Module({
  imports: [TypeOrmModule.forRoot({ ...AppDataSource.options })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
