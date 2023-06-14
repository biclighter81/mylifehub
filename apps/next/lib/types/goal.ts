export interface CreateGoal {
  name: string;
  description: string;
  goal: number;
  unit: string;
  stepSize: number;
}

export interface Goal {
  id: string;
  uid: string;
  name: string;
  description: string;
  goal: number;
  unit: string; //TODO: make this an enum
  stepSize: number;
  createdAt: Date;
  updatedAt: Date;
  completions: GoalCompletion[];
}

export interface GoalCompletion {
  id: string;

  date: Date;

  current: number;

  goal: Goal;
}
