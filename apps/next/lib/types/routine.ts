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
