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
}

export interface User_Routine {
  uid: string;
  routineId: string;
  order: number;
  active: boolean;
}
