export class RoutineNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RoutineNotFoundError';
  }
}
