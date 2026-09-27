import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ErrorState from "@/components/ErrorState";

describe("ErrorState", () => {
  it("displays the supplied error message", () => {
    render(<ErrorState message="Unable to load drug candidates." />);

    expect(screen.getByText("Unable to load drug candidates.")).toHaveClass(
      "error-state",
    );
  });
});