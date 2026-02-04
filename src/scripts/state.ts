type Listener<T> = (value: T) => void;

export class StateManager<T> {
  private state: T;
  private listeners = new Map<keyof T, Set<unknown>>();

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(updates: Partial<T>): void {
    this.state = { ...this.state, ...updates };

    Object.keys(updates).forEach((key) => {
      const k = key as keyof T;
      if (this.listeners.has(k)) {
        this.listeners.get(k)?.forEach((listener) => {
          (listener as Listener<T[typeof k]>)(this.state[k]);
        });
      }
    });
  }

  subscribe<K extends keyof T>(key: K, callback: Listener<T[K]>): () => void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add(callback);

    return () => {
      this.listeners.get(key)?.delete(callback);
    };
  }
}
