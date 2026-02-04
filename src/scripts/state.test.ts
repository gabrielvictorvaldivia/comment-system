import { describe, it, expect } from 'vitest';
import { StateManager } from './state';

describe('StateManager', () => {
  it('should initialize with default state', () => {
    const initialState = { users: [], comments: [] };
    const manager = new StateManager(initialState);

    expect(manager.getState()).toEqual(initialState);
  });
});
