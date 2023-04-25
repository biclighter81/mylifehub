import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
  })
  published: 'community' | 'friends';

  @OneToMany(() => RoutineStage, (stage) => stage.routine)
  stages: RoutineStage[];

  @OneToMany(() => User_Routine, (user_routine) => user_routine.routine)
  users: User_Routine[];
}
