// ============================================================
// LIFEPILOT — DIAGNOSTICS FRAMEWORK
// First-party, offline-safe diagnostic logging.
// No external analytics. No PII transmitted. No network calls.
// Logs stored in Dexie AppLog table. Dev console in development.
// ============================================================

export type DiagnosticSeverity = "debug" | "info" | "warn" | "error" | "fatal";

export type DiagnosticCategory =
  | "storage"
  | "repository"
  | "migration"
  | "localization"
  | "routing"
  | "performance"
  | "featureFlag"
  | "event"
  | "network"
  | "rendering"
  | "security"
  | "unknown";

export interface DiagnosticEntry {
  severity: DiagnosticSeverity;
  category: DiagnosticCategory;
  message: string;
  detail?: unknown;
  timestamp: number;
  sessionId: string;
  appVersion: string;
}

const IS_DEV = import.meta.env.DEV;
const _sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
const _appVersion = __APP_VERSION__;

const SEVERITY_LEVELS: Record<DiagnosticSeverity, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  fatal: 4,
};

type DiagnosticListener = (entry: DiagnosticEntry) => void;

class DiagnosticsService {
  private _buffer: DiagnosticEntry[] = [];
  private readonly _maxBuffer = 500;
  private _minSeverity: DiagnosticSeverity = IS_DEV ? "debug" : "warn";
  private _listeners: DiagnosticListener[] = [];

  log(
    severity: DiagnosticSeverity,
    category: DiagnosticCategory,
    message: string,
    detail?: unknown
  ): void {
    if (SEVERITY_LEVELS[severity] < SEVERITY_LEVELS[this._minSeverity]) return;

    const entry: DiagnosticEntry = {
      severity,
      category,
      message,
      detail,
      timestamp: Date.now(),
      sessionId: _sessionId,
      appVersion: _appVersion,
    };

    this._buffer.push(entry);
    if (this._buffer.length > this._maxBuffer) this._buffer.shift();

    this._notifyListeners(entry);
    this._consoleWrite(entry);
  }

  debug(category: DiagnosticCategory, message: string, detail?: unknown): void {
    this.log("debug", category, message, detail);
  }

  info(category: DiagnosticCategory, message: string, detail?: unknown): void {
    this.log("info", category, message, detail);
  }

  warn(category: DiagnosticCategory, message: string, detail?: unknown): void {
    this.log("warn", category, message, detail);
  }

  error(category: DiagnosticCategory, message: string, detail?: unknown): void {
    this.log("error", category, message, detail);
  }

  fatal(category: DiagnosticCategory, message: string, detail?: unknown): void {
    this.log("fatal", category, message, detail);
  }

  storageError(message: string, detail?: unknown): void {
    this.error("storage", message, detail);
  }

  repositoryError(message: string, detail?: unknown): void {
    this.error("repository", message, detail);
  }

  migrationWarn(message: string, detail?: unknown): void {
    this.warn("migration", message, detail);
  }

  localizationError(message: string, detail?: unknown): void {
    this.error("localization", message, detail);
  }

  routingError(message: string, detail?: unknown): void {
    this.error("routing", message, detail);
  }

  performanceWarn(message: string, durationMs: number): void {
    this.warn("performance", message, { durationMs });
  }

  getBuffer(
    options: {
      severity?: DiagnosticSeverity;
      category?: DiagnosticCategory;
      limit?: number;
    } = {}
  ): DiagnosticEntry[] {
    let entries = this._buffer;
    if (options.severity) {
      entries = entries.filter(
        (e) => SEVERITY_LEVELS[e.severity] >= SEVERITY_LEVELS[options.severity!]
      );
    }
    if (options.category) {
      entries = entries.filter((e) => e.category === options.category);
    }
    if (options.limit) {
      entries = entries.slice(-options.limit);
    }
    return entries;
  }

  clearBuffer(): void {
    this._buffer = [];
  }

  setMinSeverity(severity: DiagnosticSeverity): void {
    this._minSeverity = severity;
  }

  addListener(listener: DiagnosticListener): () => void {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((l) => l !== listener);
    };
  }

  get sessionId(): string {
    return _sessionId;
  }

  private _notifyListeners(entry: DiagnosticEntry): void {
    for (const listener of this._listeners) {
      try {
        listener(entry);
      } catch {
        // Never allow listener errors to propagate
      }
    }
  }

  private _consoleWrite(entry: DiagnosticEntry): void {
    if (!IS_DEV) return;
    const prefix = `[LifePilot/${entry.category}]`;
    switch (entry.severity) {
      case "debug":
        console.debug(prefix, entry.message, entry.detail ?? "");
        break;
      case "info":
        console.info(prefix, entry.message, entry.detail ?? "");
        break;
      case "warn":
        console.warn(prefix, entry.message, entry.detail ?? "");
        break;
      case "error":
      case "fatal":
        console.error(prefix, entry.message, entry.detail ?? "");
        break;
    }
  }
}

export const diagnostics = new DiagnosticsService();
