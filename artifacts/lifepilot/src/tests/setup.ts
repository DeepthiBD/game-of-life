import "@testing-library/jest-dom";
import { vi, beforeEach, afterEach } from "vitest";

// Mock Dexie for tests — must be a class, not a plain function mock
vi.mock("dexie", () => {
  class MockDexie {
    pilots = { add: vi.fn(), get: vi.fn(), where: vi.fn(() => ({ equals: vi.fn(() => ({ first: vi.fn(), toArray: vi.fn() })) })), orderBy: vi.fn(() => ({ toArray: vi.fn() })) };
    settings = { add: vi.fn(), get: vi.fn(), where: vi.fn(() => ({ equals: vi.fn(() => ({ first: vi.fn() })) })) };
    version() { return { stores: () => {} }; }
  }
  return { default: MockDexie };
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock navigator.onLine
Object.defineProperty(navigator, "onLine", {
  writable: true,
  value: true,
});

// Suppress console.error in tests unless needed
const originalError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});
afterEach(() => {
  console.error = originalError;
});
