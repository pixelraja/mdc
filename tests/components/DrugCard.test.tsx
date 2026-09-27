import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DrugCard from "@/components/DrugCard";
import type { DrugCandidate } from "@/lib/types/drug";

const drug: DrugCandidate = {
  id: "candidate-1",
  name: "Test compound",
  status: "Phase I",
  description: "A treatment under evaluation.",
  mechanismOfAction: "Targeted mechanism",
  sideEffects: ["Headache"],
  sponsor: "Example sponsor",
  therapeuticArea: "Oncology",
  dateUpdated: "2026-01-01",
};

describe("DrugCard", () => {
  it("renders drug details and links to the drug page", () => {
    render(<DrugCard drug={drug} />);

    expect(screen.getByRole("heading", { name: "Test compound" })).toBeInTheDocument();
    expect(screen.getByText("A treatment under evaluation.")).toBeInTheDocument();
    expect(screen.getByText("Phase I")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/drugs/candidate-1");
  });
});