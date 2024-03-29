import { DataSource } from 'typeorm';
import { Routine } from './routine/entities/routine.entity';
import { RoutineStage } from './routine/entities/routine-stage.entity';
import { User_Routine } from './routine/entities/use_routine.join-entity';
import { RoutineStageCompletion } from './routine/entities/routine-stage-completion.entity';
import { Goal } from './goal/entities/goal.entity';
import { GoalCompletion } from './goal/entities/goal-completion.entity';

// eslint-disable-next-line
const dotenv = require('dotenv');
dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    Routine,
    RoutineStage,
    User_Routine,
    RoutineStageCompletion,
    Goal,
    GoalCompletion,
  ],
  schema: process.env.DB_SCHEMA,
  synchronize: true,
  useUTC: true,
  logging: ['error'],
});
