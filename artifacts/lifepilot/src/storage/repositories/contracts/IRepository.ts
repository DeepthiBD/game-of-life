// ============================================================
// LIFEPILOT — REPOSITORY CONTRACT
// Base interface all repositories must implement.
// Provides a stable, storage-agnostic API over Dexie tables.
// ============================================================

export interface IRepository<T, TKey = number> {
  getById(id: TKey): Promise<T | undefined>;
  getAll(): Promise<T[]>;
  create(entity: Omit<T, "id">): Promise<TKey>;
  update(id: TKey, changes: Partial<T>): Promise<void>;
  delete(id: TKey): Promise<void>;
  count(): Promise<number>;
  exists(id: TKey): Promise<boolean>;
}

export interface IFilterableRepository<T, TKey = number> extends IRepository<T, TKey> {
  findWhere(predicate: (entity: T) => boolean): Promise<T[]>;
}

export interface IPilotScopedRepository<T, TKey = number> extends IFilterableRepository<T, TKey> {
  getAllForPilot(pilotId: number): Promise<T[]>;
  countForPilot(pilotId: number): Promise<number>;
  deleteAllForPilot(pilotId: number): Promise<void>;
}

export interface IResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export function ok<T>(data: T): IResult<T> {
  return { success: true, data };
}

export function fail<T>(error: string): IResult<T> {
  return { success: false, error };
}
