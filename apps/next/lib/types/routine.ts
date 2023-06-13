export interface Routine {
  id: string;

  active: boolean;

  name: string;

  description: string;

  preferredTime: string;

  published: 'community' | 'friends' | null;

  updatedAt: Date;

  createdAt: Date;

  stages: RoutineStage[];
  users: User_Routine[];
}

export interface RoutineStage {
  id: string;

  name: string;

  description: string;

  estimatedDuration: number;

  deletedAt: Date;

  updatedAt: Date;

  createdAt: Date;
  completions: RoutineStageCompletion[];
}

export interface RoutineStageCompletion {
  id: string;
  uid: string;
  completedAt: Date;
  stageId: string;
}
export interface User_Routine {
  uid: string;
  routineId: string;
  order: number;
  active: boolean;
}

export interface CreateRoutineInput {
  name: string;
  description: string;
  preferredTime: string;
  published: 'community' | 'friends';
  stages: CreateStageInput[];
}

export interface CreateStageInput {
  name: string;
  description: string;
  estimatedDuration: number;
}
