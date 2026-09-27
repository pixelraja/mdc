import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import StatusFilter from "@/components/StatusFilter";
import { DRUG_STATUSES } from "@/lib/types/drug";

describe("StatusFilter", () => {
  it("renders all status options with the selected value", () => {
    render(<StatusFilter value="Phase II" onChange={vi.fn()} />);

    const filter = screen.getByLabelText("Status filter");
    expect(filter).toHaveValue("Phase II");
    expect(screen.getAllByRole("option")).toHaveLength(DRUG_STATUSES.length + 1);
    expect(screen.getByRole("option", { name: "All statuses" })).toHaveValue("");
  });

  it("reports the selected status", () => {
    const onChange = vi.fn();
    render(<StatusFilter value="" onChange={onChange} />);

    fireEvent.change(screen.getByLabelText("Status filter"), {
      target: { value: "Approved" },
    });

    expect(onChange).toHaveBeenCalledWith("Approved");
  });
});