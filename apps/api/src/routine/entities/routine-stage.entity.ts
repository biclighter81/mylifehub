import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Routine } from './routine.entity';

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

  @ManyToOne(() => Routine, (routine) => routine.stages)
  routine: Routine;
}
