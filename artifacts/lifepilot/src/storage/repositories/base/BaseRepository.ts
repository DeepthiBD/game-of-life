// ============================================================
// LIFEPILOT — BASE REPOSITORY IMPLEMENTATION
// Wraps a Dexie Table with the IRepository contract.
// All entity repositories extend this class.
// ============================================================

import type { Table } from "dexie";
import { diagnostics } from "@/core/diagnostics/diagnostics";
import type { IFilterableRepository } from "../contracts/IRepository";

export abstract class BaseRepository<T extends { id?: number }, TKey extends number = number>
  implements IFilterableRepository<T, TKey> {
  protected abstract readonly tableName: string;
  protected abstract get table(): Table<T, TKey>;

  async getById(id: TKey): Promise<T | undefined> {
    try {
      return await this.table.get(id);
    } catch (err) {
      diagnostics.repositoryError(`getById failed on ${this.tableName}`, { id, err });
      throw err;
    }
  }

  async getAll(): Promise<T[]> {
    try {
      return await this.table.toArray();
    } catch (err) {
      diagnostics.repositoryError(`getAll failed on ${this.tableName}`, { err });
      throw err;
    }
  }

  async create(entity: Omit<T, "id">): Promise<TKey> {
    try {
      return (await this.table.add(entity as T)) as TKey;
    } catch (err) {
      diagnostics.repositoryError(`create failed on ${this.tableName}`, { err });
      throw err;
    }
  }

  async update(id: TKey, changes: Partial<T>): Promise<void> {
    try {
      await this.table.update(id, changes as Parameters<Table<T, TKey>["update"]>[1]);
    } catch (err) {
      diagnostics.repositoryError(`update failed on ${this.tableName}`, { id, err });
      throw err;
    }
  }

  async delete(id: TKey): Promise<void> {
    try {
      await this.table.delete(id);
    } catch (err) {
      diagnostics.repositoryError(`delete failed on ${this.tableName}`, { id, err });
      throw err;
    }
  }

  async count(): Promise<number> {
    try {
      return await this.table.count();
    } catch (err) {
      diagnostics.repositoryError(`count failed on ${this.tableName}`, { err });
      throw err;
    }
  }

  async exists(id: TKey): Promise<boolean> {
    const record = await this.getById(id);
    return record !== undefined;
  }

  async findWhere(predicate: (entity: T) => boolean): Promise<T[]> {
    try {
      const all = await this.table.toArray();
      return all.filter(predicate);
    } catch (err) {
      diagnostics.repositoryError(`findWhere failed on ${this.tableName}`, { err });
      throw err;
    }
  }
}

export abstract class BasePilotScopedRepository<
  T extends { id?: number; pilotId: number }
> extends BaseRepository<T> {
  async getAllForPilot(pilotId: number): Promise<T[]> {
    try {
      return await this.table.where("pilotId").equals(pilotId).toArray();
    } catch (err) {
      diagnostics.repositoryError(`getAllForPilot failed on ${this.tableName}`, { pilotId, err });
      throw err;
    }
  }

  async countForPilot(pilotId: number): Promise<number> {
    try {
      return await this.table.where("pilotId").equals(pilotId).count();
    } catch (err) {
      diagnostics.repositoryError(`countForPilot failed on ${this.tableName}`, { pilotId, err });
      throw err;
    }
  }

  async deleteAllForPilot(pilotId: number): Promise<void> {
    try {
      await this.table.where("pilotId").equals(pilotId).delete();
    } catch (err) {
      diagnostics.repositoryError(`deleteAllForPilot failed on ${this.tableName}`, { pilotId, err });
      throw err;
    }
  }
}
