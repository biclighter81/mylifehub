import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateRoutine } from '../lib/dto/routine.dto';
import { AuthGuard, AuthenticatedUser } from 'nest-keycloak-connect';
import { JWTKeycloakUser } from 'types';
import { RoutineService } from './routine.service';
import { RoutineNotFoundError } from '../lib/errors/routine';

@Controller('routine')
export class RoutineController {
  constructor(private readonly routineSrv: RoutineService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  async getRoutine(
    @AuthenticatedUser() user: JWTKeycloakUser,
    @Param('id') id: string,
  ) {
    try {
      return await this.routineSrv.getRoutine(id, user.sub);
    } catch (e) {
      if (e instanceof RoutineNotFoundError) {
        throw new HttpException('Routine not found!', 404);
      }
      console.error(e);
      throw new HttpException('Error getting routine', 500);
    }
  }

  @Get('')
  @UseGuards(AuthGuard)
  async getRoutines(@AuthenticatedUser() user: JWTKeycloakUser) {
    try {
      return await this.routineSrv.getRoutines(user.sub);
    } catch (e) {
      console.log(e);
      throw new HttpException('Error getting routines', 500);
    }
  }

  @Get('public')
  async getPublicRoutines(@Query('offset') offset: string) {
    try {
      return await this.routineSrv.getPublicRoutines(parseInt(offset));
    } catch (e) {
      console.log(e);
      throw new HttpException('Error getting community routines', 500);
    }
  }

  @Post('')
  async createRoutine(@Body() body: CreateRoutine) {}

  @Put(':id')
  async updateRoutine() {}
}
