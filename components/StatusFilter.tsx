"use client";

import { DRUG_STATUSES } from "@/lib/types/drug";

export default function StatusFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      aria-label="Status filter"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="status-select"
    >
      <option value="">All statuses</option>
      {DRUG_STATUSES.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
