import { Module } from '@nestjs/common';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from './entities/goal.entity';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { GoalCompletion } from './entities/goal-completion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Goal, GoalCompletion]),
    KeycloakConnectModule.register({
      authServerUrl: process.env.KEYCLOAK_URL,
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      secret: process.env.KEYCLOAK_CLIENT_SECRET,
    }),
  ],
  providers: [GoalService],
  controllers: [GoalController],
})
export class GoalModule {}
