import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Goal } from './goal.entity';

@Entity('goal_completion')
export class GoalCompletion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  current: number;

  @ManyToOne(() => Goal, (goal) => goal.completions)
  goal: Goal;
}
