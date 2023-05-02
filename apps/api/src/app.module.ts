import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './datasource';
import { RoutineModule } from './routine/routine.module';
import { KeycloakConnectModule } from 'nest-keycloak-connect';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...AppDataSource.options }),
    RoutineModule,
    KeycloakConnectModule.register({
      authServerUrl: process.env.KEYCLOAK_URL,
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      secret: process.env.KEYCLOAK_CLIENT_SECRET,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
