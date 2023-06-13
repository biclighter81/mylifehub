import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoutineStage } from './routine-stage.entity';

@Entity('routine_stage_completion')
export class RoutineStageCompletion {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  stageId: string;
  @Column()
  uid: string;
  @Column()
  completedAt: Date;
  @ManyToOne(() => RoutineStage, (stage) => stage.completions)
  stage: RoutineStage;
}
