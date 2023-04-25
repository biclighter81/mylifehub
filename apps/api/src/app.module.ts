import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './datasource';
import { RoutineModule } from './routine/routine.module';

@Module({
  imports: [TypeOrmModule.forRoot({ ...AppDataSource.options }), RoutineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
