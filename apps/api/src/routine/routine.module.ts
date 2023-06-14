import { Module } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { RoutineController } from './routine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { RoutineStage } from './entities/routine-stage.entity';
import { RoutineStageCompletion } from './entities/routine-stage-completion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Routine, RoutineStage, RoutineStageCompletion]),
    KeycloakConnectModule.register({
      authServerUrl: process.env.KEYCLOAK_URL,
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      secret: process.env.KEYCLOAK_CLIENT_SECRET,
    }),
  ],
  providers: [RoutineService],
  controllers: [RoutineController],
})
export class RoutineModule {}
