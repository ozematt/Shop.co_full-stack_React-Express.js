import { saveTheme } from "../lib/helpers";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("savedTheme", () => {
  // mocking localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      clear: () => {
        store = {};
      },
    };
  })();
  Object.defineProperty(window, "localStorage", { value: localStorageMock });

  beforeEach(() => {
    // clear mocks
    vi.clearAllMocks();
    document.documentElement.className = ""; // clear `document.documentElement` class
  });

  it("should save the theme to localStorage", () => {
    saveTheme("dark");
    expect(localStorageMock.getItem("theme")).toBe(JSON.stringify("dark"));

    saveTheme("light");
    expect(localStorageMock.getItem("theme")).toBe(JSON.stringify("light"));
  });

  it('should add the "dark" class to document.documentElement for dark theme', () => {
    saveTheme("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it('should remove the "dark" class from document.documentElement for light theme', () => {
    document.documentElement.classList.add("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
