import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoal } from '../lib/dto/goal.dto';
import { AuthGuard, AuthenticatedUser } from 'nest-keycloak-connect';
import { JWTKeycloakUser } from 'types';
import { GoalNotFound } from '../lib/errors/goal';

@Controller('goal')
export class GoalController {
  constructor(private readonly goalSrv: GoalService) {}

  @Post('')
  @UseGuards(AuthGuard)
  async createGoal(
    @Body() createGoal: CreateGoal,
    @AuthenticatedUser() user: JWTKeycloakUser,
  ) {
    try {
      return await this.goalSrv.createGoal(createGoal, user.sub);
    } catch (e) {
      throw new HttpException('Error creating goal', 500);
    }
  }

  @Get('')
  @UseGuards(AuthGuard)
  async getGoals(@AuthenticatedUser() user: JWTKeycloakUser) {
    try {
      return await this.goalSrv.getGoals(user.sub);
    } catch (e) {
      throw new HttpException('Error getting goals', 500);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteGoal(
    @AuthenticatedUser() user: JWTKeycloakUser,
    @Param('id') id: string,
  ) {
    try {
      return await this.goalSrv.deleteGoal(id, user.sub);
    } catch (e) {
      if (e instanceof GoalNotFound) {
        throw new HttpException('Goal not found!', 404);
      }
      throw new HttpException('Error deleting goal', 500);
    }
  }

  @Post('increase/:id')
  @UseGuards(AuthGuard)
  async increaseGoalCompletion(
    @AuthenticatedUser() user: JWTKeycloakUser,
    @Param('id') id: string,
  ) {
    try {
      return await this.goalSrv.modifyGoalCompletion(id, user.sub);
    } catch (e) {
      if (e instanceof GoalNotFound) {
        throw new HttpException('Goal not found!', 404);
      }
      throw new HttpException('Error increasing goal completion', 500);
    }
  }

  @Post('decrease/:id')
  @UseGuards(AuthGuard)
  async decreaseGoalCompletion(
    @AuthenticatedUser() user: JWTKeycloakUser,
    @Param('id') id: string,
  ) {
    try {
      return await this.goalSrv.modifyGoalCompletion(id, user.sub, true);
    } catch (e) {
      if (e instanceof GoalNotFound) {
        throw new HttpException('Goal not found!', 404);
      }
      throw new HttpException('Error decreasing goal completion', 500);
    }
  }
}
