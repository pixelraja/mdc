import type { DrugStatus } from "@/lib/types/drug";

const statusClass: Record<DrugStatus, string> = {
  Approved: "status-approved",
  "Phase III": "status-phase-iii",
  "Phase II": "status-phase-ii",
  "Phase I": "status-phase-i",
  "In Development": "status-in-development",
  Discontinued: "status-discontinued",
};

export default function StatusBadge({ status }: { status: DrugStatus }) {
  return (
    <span className={`status-badge ${statusClass[status]}`}>
      <span className="status-dot" aria-hidden="true" />
      {status}
    </span>
  );
}
