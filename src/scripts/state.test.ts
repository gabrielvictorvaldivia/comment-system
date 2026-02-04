import { describe, it, expect } from 'vitest';
import { StateManager } from './state';

describe('StateManager', () => {
  it('should initialize with default state', () => {
    const initialState = { users: [], comments: [] };
    const manager = new StateManager(initialState);

    expect(manager.getState()).toEqual(initialState);
  });

  it('should update state', () => {
    interface TestState {
      count: number;
      text: string;
    }

    const manager = new StateManager<TestState>({ count: 0, text: 'hello' });

    manager.setState({ count: 1 });

    expect(manager.getState()).toEqual({ count: 1, text: 'hello' });
  });

  it('should notify subscribers when state changes', () => {
    const manager = new StateManager({ count: 0 });
    let capturedValue: number | undefined;

    // @ts-expect-error - method doesn't exist yet
    manager.subscribe('count', (newValue) => {
      capturedValue = newValue;
    });

    manager.setState({ count: 5 });

    expect(capturedValue).toBe(5);
  });
});
