import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import SearchBar from "@/components/SearchBar";

afterEach(() => {
  vi.useRealTimers();
});

describe("SearchBar", () => {
  it("debounces changes for 300ms", () => {
    vi.useFakeTimers();
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("Search drugs"), {
      target: { value: "on" },
    });

    expect(onChange).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(200));
    fireEvent.change(screen.getByLabelText("Search drugs"), {
      target: { value: "onc" },
    });

    act(() => vi.advanceTimersByTime(299));
    expect(onChange).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(1));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith("onc");
  });

  it("updates the input when the value prop changes", () => {
    const onChange = vi.fn();
    const { rerender } = render(<SearchBar value="initial" onChange={onChange} />);

    rerender(<SearchBar value="updated" onChange={onChange} />);

    expect(screen.getByLabelText("Search drugs")).toHaveValue("updated");
  });
});
