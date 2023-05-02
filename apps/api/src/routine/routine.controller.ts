import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CreateRoutine } from '../lib/dto/routine.dto';

@Controller('routine')
export class RoutineController {
  @Get(':id')
  async getRoutine() {}

  @Get('')
  async getRoutines() {
    return [{ id: 1 }, { id: 2 }];
  }

  @Get('public')
  async getPublicRoutines() {}

  @Post('')
  async createRoutine(@Body() body: CreateRoutine) {}

  @Put(':id')
  async updateRoutine() {}
}
