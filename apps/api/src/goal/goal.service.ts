import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Goal } from './entities/goal.entity';
import { Repository } from 'typeorm';
import { CreateGoal } from '../lib/dto/goal.dto';
import { GoalNotFound } from '../lib/errors/goal';
import dayjs from 'dayjs';
import { GoalCompletion } from './entities/goal-completion.entity';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepo: Repository<Goal>,
    @InjectRepository(GoalCompletion)
    private readonly completionRepo: Repository<GoalCompletion>,
  ) {}

  async createGoal(input: CreateGoal, sub: string) {
    return await this.goalRepo.save({
      ...input,
      uid: sub,
    });
  }

  async modifyGoalCompletion(id: string, sub: string, decrease?: boolean) {
    const goal = await this.goalRepo.findOne({
      where: { id, uid: sub },
      relations: ['completions'],
    });
    if (!goal) throw new GoalNotFound('Goal not found!');
    const stepCount = goal.stepSize;
    const completion = goal.completions.find(
      (g) =>
        dayjs(g.date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD'),
    );
    if (!completion && decrease) {
      throw new Error(
        'Cannot decrease a goal that has not been completed today!',
      );
    }
    if (!completion) {
      await this.goalRepo.query(
        'insert into goal_completion (date, current, "goalId") values ($1, $2, $3)',
        [dayjs().format('YYYY-MM-DD'), stepCount, id],
      );
    } else {
      const operation = decrease ? '-' : '+';
      await this.goalRepo.query(
        `update goal_completion set current = current ${operation} $1 where id = $2`,
        [stepCount, completion.id],
      );
    }
    return await this.goalRepo.findOne({
      where: { id, uid: sub },
      relations: ['completions'],
    });
  }

  async getGoals(sub: string) {
    return await this.goalRepo.find({
      where: { uid: sub },
      relations: ['completions'],
    });
  }

  async deleteGoal(id: string, sub: string) {
    const goal = await this.goalRepo.findOne({
      where: { id, uid: sub },
    });
    if (!goal) throw new GoalNotFound('Goal not found!');
    await this.completionRepo.delete({
      goal: {
        id: goal.id,
      },
    });
    return await this.goalRepo.delete({ id, uid: sub });
  }
}
