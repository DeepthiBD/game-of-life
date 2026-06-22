// ============================================================
// LIFEPILOT — INTERNAL EVENT BUS
// Lightweight publish/subscribe for domain events.
// Synchronous, in-process only. No network. No external deps.
// ============================================================

import type { LifePilotEvent, LifePilotEventType } from "./events";

type EventHandler<T = unknown> = (event: LifePilotEvent<T>) => void;

let _handlerIdCounter = 0;

interface RegisteredHandler {
  id: number;
  type: LifePilotEventType | "*";
  handler: EventHandler<unknown>;
}

class LifePilotEventBus {
  private readonly _handlers: RegisteredHandler[] = [];
  private _eventLog: LifePilotEvent<unknown>[] = [];
  private readonly _maxLogSize = 100;

  subscribe<T = unknown>(
    type: LifePilotEventType | "*",
    handler: EventHandler<T>
  ): () => void {
    const id = ++_handlerIdCounter;
    this._handlers.push({ id, type, handler: handler as EventHandler<unknown> });
    return () => this.unsubscribe(id);
  }

  unsubscribe(id: number): void {
    const idx = this._handlers.findIndex((h) => h.id === id);
    if (idx !== -1) this._handlers.splice(idx, 1);
  }

  publish<T = unknown>(type: LifePilotEventType, payload: T): void {
    const event: LifePilotEvent<T> = {
      type,
      payload,
      timestamp: Date.now(),
      correlationId: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    };

    this._logEvent(event);

    const targets = this._handlers.filter(
      (h) => h.type === "*" || h.type === type
    );

    for (const { handler } of targets) {
      try {
        handler(event as LifePilotEvent<unknown>);
      } catch (err) {
        console.error(`[EventBus] Handler error for event "${type}":`, err);
      }
    }
  }

  once<T = unknown>(
    type: LifePilotEventType,
    handler: EventHandler<T>
  ): () => void {
    const unsub = this.subscribe<T>(type, (event) => {
      handler(event);
      unsub();
    });
    return unsub;
  }

  getRecentEvents(limit = 20): LifePilotEvent<unknown>[] {
    return this._eventLog.slice(-limit);
  }

  clearLog(): void {
    this._eventLog = [];
  }

  handlerCount(type?: LifePilotEventType): number {
    if (!type) return this._handlers.length;
    return this._handlers.filter((h) => h.type === type || h.type === "*").length;
  }

  private _logEvent(event: LifePilotEvent<unknown>): void {
    this._eventLog.push(event);
    if (this._eventLog.length > this._maxLogSize) {
      this._eventLog.shift();
    }
  }
}

export const eventBus = new LifePilotEventBus();
export type { EventHandler };
