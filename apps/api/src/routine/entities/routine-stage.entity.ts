import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Routine } from './routine.entity';
import { RoutineStageCompletion } from './routine-stage-completion.entity';

@Entity('routine_stage')
export class RoutineStage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  estimatedDuration: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Routine, (routine) => routine.stages)
  routine: Routine;

  @OneToMany(
    () => RoutineStageCompletion,
    (routine_completion) => routine_completion.stage,
    {
      cascade: true,
    },
  )
  completions: RoutineStageCompletion[];
}
