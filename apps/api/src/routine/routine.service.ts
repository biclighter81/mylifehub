import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';
import { Repository } from 'typeorm';
import { RoutineNotFoundError } from '../lib/errors/routine';
import { RoutineStage } from './entities/routine-stage.entity';
import { CreateRoutine, CreateStage } from '../lib/dto/routine.dto';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(Routine)
    private readonly routineRepo: Repository<Routine>,
    @InjectRepository(RoutineStage)
    private readonly routineStageRepo: Repository<RoutineStage>,
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

  //invoked if user enables or disables a routine
  async setRoutineState(id: string, sub: string, active: boolean) {
    return await this.routineRepo.query(
      'update public.user_routine set active = $1 where uid = $2 and "routineId" = $3',
      [active, sub, id],
    );
  }

  async getRoutines(sub: string) {
    return await this.routineRepo.find({
      where: { users: [{ uid: sub }] },
      relations: ['stages', 'users', 'stages.completions'],
    });
  }

  async getPublicRoutines(offset: number) {
    return await this.routineRepo.find({
      where: { published: 'community' },
      skip: offset,
      take: 10,
    });
  }

  async createRoutine(input: CreateRoutine, sub: string) {
    const stages: Partial<RoutineStage>[] = input.stages?.length
      ? input.stages.map((stage) => ({
          ...stage,
          routine: undefined,
          id: undefined,
        }))
      : [];
    return await this.routineRepo.save({
      ...input,
      stages: stages,
      users: [{ uid: sub }],
    });
  }

  async deleteRoutine(id: string, sub: string) {
    const routine = await this.routineRepo.findOne({
      where: { id, users: [{ uid: sub }] },
    });
    if (!routine) throw new RoutineNotFoundError('Routine not found!');
    return await this.routineRepo.softDelete(routine.id);
  }

  async addStage(id: string, sub: string, input: CreateStage) {
    const routine = await this.routineRepo.findOne({
      where: { id, users: [{ uid: sub }] },
      relations: ['stages'],
    });
    if (!routine) throw new RoutineNotFoundError('Routine not found!');
    return await this.routineRepo.save({
      ...routine,
      stages: [
        ...routine.stages,
        {
          ...input,
        },
      ],
    });
  }

  async removeStage(id: string, stageId: string, sub: string) {
    const routine = await this.routineRepo.findOne({
      where: { id, users: [{ uid: sub }] },
      relations: ['stages'],
    });
    if (!routine) throw new RoutineNotFoundError('Routine not found!');
    return await this.routineRepo.save({
      ...routine,
      stages: routine.stages.map((stage) => ({
        ...stage,
        deletedAt: stage.id === stageId ? new Date() : stage.deletedAt,
      })),
    });
  }

  async completeStage(id: string, sub: string) {
    const stage = await this.routineStageRepo.findOne({
      where: { id, routine: { users: [{ uid: sub }] } },
      relations: ['completions'],
    });
    if (!stage) throw new RoutineNotFoundError('Stage not found!');
    return await this.routineStageRepo.save({
      ...stage,
      completions: [
        ...stage.completions,
        {
          uid: sub,
          completedAt: new Date(),
        },
      ],
    });
  }
}
