export class GoalNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GoalNotFound';
  }
}
