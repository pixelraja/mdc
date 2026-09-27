import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Header from "@/components/Header";

const { pushMock, refreshMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  refreshMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, refresh: refreshMock }),
}));

const storage = new Map<string, string>();
const localStorageMock = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  clear: () => storage.clear(),
};

describe("Header", () => {
  beforeEach(() => {
    storage.clear();
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: localStorageMock,
    });
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "";
    pushMock.mockReset();
    refreshMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("restores the saved dark theme", () => {
    localStorageMock.setItem("drug-theme", "dark");

    render(<Header />);

    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");
  });

  it("toggles and persists the theme", () => {
    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));

    expect(localStorageMock.getItem("drug-theme")).toBe("dark");
    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");
  });

  it("posts logout and navigates to login", async () => {
    const fetchMock = vi.fn().mockResolvedValue({});
    vi.stubGlobal("fetch", fetchMock);

    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/login"));
    expect(fetchMock).toHaveBeenCalledWith("/api/auth/logout", { method: "POST" });
    expect(refreshMock).toHaveBeenCalledOnce();
  });
});