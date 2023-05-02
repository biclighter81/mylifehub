import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';
import { Repository } from 'typeorm';
import { RoutineNotFoundError } from '../lib/errors/routine';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(Routine)
    private readonly routineRepo: Repository<Routine>,
  ) {}

  async getRoutine(id: string, sub: string) {
    let routine = await this.routineRepo.findOne({
      where: { id, users: [{ uid: sub }] },
    });
    if (!routine) {
      routine = await this.routineRepo.findOne({
        where: { id, published: 'community' },
      });
    }
    if (!routine) throw new RoutineNotFoundError('Routine not found!');
    return routine;
  }

  async getRoutines(sub: string) {
    return await this.routineRepo.find({ where: { users: [{ uid: sub }] } });
  }

  async getPublicRoutines(offset: number) {
    return await this.routineRepo.find({
      where: { published: 'community' },
      skip: offset,
      take: 10,
    });
  }
}
