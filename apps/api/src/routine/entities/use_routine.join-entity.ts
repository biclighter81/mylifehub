import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Routine } from './routine.entity';

@Entity('user_routine')
export class User_Routine {
  @PrimaryColumn()
  uid: string;

  @PrimaryColumn()
  routineId: string;

  @Column({
    nullable: true,
  })
  order: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => Routine, (routine) => routine.users)
  routine: Routine;
}
