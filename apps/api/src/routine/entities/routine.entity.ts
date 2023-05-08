import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoutineStage } from './routine-stage.entity';
import { User_Routine } from './use_routine.join-entity';

@Entity('routine')
export class Routine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'time' })
  preferredTime: string;

  @Column({
    type: 'enum',
    enum: ['community', 'friends'],
    nullable: true,
  })
  published: 'community' | 'friends' | null;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => RoutineStage, (stage) => stage.routine, { cascade: true })
  stages: RoutineStage[];

  @OneToMany(() => User_Routine, (user_routine) => user_routine.routine, {
    cascade: true,
  })
  users: User_Routine[];
}
