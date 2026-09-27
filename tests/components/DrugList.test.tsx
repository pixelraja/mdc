import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DrugList from "@/components/DrugList";
const drug = {
  id: "1",
  name: "Test",
  status: "Phase I" as const,
  description: "Desc",
  mechanismOfAction: "MOA",
  sideEffects: ["Headache"],
  sponsor: "Sponsor",
  therapeuticArea: "Oncology",
  dateUpdated: "2026-01-01",
};
describe("DrugList", () => {
  it("renders items", () => {
    render(<DrugList drugs={[drug]} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Test Desc Phase I/ })).toHaveAttribute(
      "href",
      "/drugs/1",
    );
  });
  it("renders empty state", () => {
    render(<DrugList drugs={[]} />);
    expect(screen.getByText(/No drug candidates/i)).toBeInTheDocument();
  });
});
