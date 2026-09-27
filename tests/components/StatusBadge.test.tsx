import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatusBadge from "@/components/StatusBadge";
import { DRUG_STATUSES } from "@/lib/types/drug";

const statusClasses = {
  Approved: "status-approved",
  "Phase III": "status-phase-iii",
  "Phase II": "status-phase-ii",
  "Phase I": "status-phase-i",
  "In Development": "status-in-development",
  Discontinued: "status-discontinued",
} as const;

describe("StatusBadge", () => {
  it.each(DRUG_STATUSES)("renders the %s status", (status) => {
    render(<StatusBadge status={status} />);

    expect(screen.getByText(status)).toHaveClass("status-badge", statusClasses[status]);
  });
});