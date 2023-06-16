import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GoalCompletion } from './goal-completion.entity';

@Entity('goal')
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  uid: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  goal: number;
  @Column()
  unit: string; //TODO: make this an enum
  @Column()
  stepSize: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => GoalCompletion, (goalCompletion) => goalCompletion.goal, {cascade: true})
  completions: GoalCompletion[];
}
