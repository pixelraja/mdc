import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoadingSkeleton from "@/components/LoadingSkeleton";

describe("LoadingSkeleton", () => {
  it("announces loading and renders nine placeholder rows", () => {
    render(<LoadingSkeleton />);

    const loadingList = screen.getByLabelText("Loading");
    expect(loadingList.querySelectorAll(".loading-row")).toHaveLength(9);
    expect(loadingList.querySelectorAll(".skeleton")).toHaveLength(18);
  });
});