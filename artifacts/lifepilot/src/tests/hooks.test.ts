import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useOfflineStatus } from "../hooks/useOfflineStatus";
import { useTheme } from "../hooks/useTheme";

describe("useOfflineStatus", () => {
  it("should return online status when navigator.onLine is true", () => {
    Object.defineProperty(navigator, "onLine", { value: true, writable: true });
    const { result } = renderHook(() => useOfflineStatus());
    expect(result.current.isOnline).toBe(true);
    expect(result.current.isOffline).toBe(false);
  });

  it("should respond to offline event", () => {
    const { result } = renderHook(() => useOfflineStatus());
    act(() => {
      window.dispatchEvent(new Event("offline"));
    });
    expect(result.current.isOffline).toBe(true);
  });

  it("should respond to online event", () => {
    const { result } = renderHook(() => useOfflineStatus());
    act(() => {
      window.dispatchEvent(new Event("offline"));
    });
    act(() => {
      window.dispatchEvent(new Event("online"));
    });
    expect(result.current.isOnline).toBe(true);
  });
});

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should default to system theme", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("system");
  });

  it("should allow setting light theme", () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.setTheme("light");
    });
    expect(result.current.theme).toBe("light");
    expect(localStorage.getItem("lifepilot-theme")).toBe("light");
  });

  it("should allow setting dark theme", () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.setTheme("dark");
    });
    expect(result.current.theme).toBe("dark");
  });
});
