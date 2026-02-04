export class StateManager<T> {
  private state: T;

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(updates: Partial<T>): void {
    this.state = { ...this.state, ...updates };
  }
}
