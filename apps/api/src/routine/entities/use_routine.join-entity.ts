import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Routine } from './routine.entity';

@Entity('user_routine')
export class User_Routine {
  @PrimaryColumn()
  uid: string;

  @PrimaryColumn()
  routineId: string;

  @Column()
  order: number;

  @ManyToOne(() => Routine, (routine) => routine.users)
  routine: Routine;
}
