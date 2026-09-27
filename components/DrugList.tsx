"use client";

import type { DrugCandidate } from "@/lib/types/drug";
import DrugCard from "./DrugCard";

export default function DrugList({ drugs }: { drugs: DrugCandidate[] }) {
  if (!drugs.length) {
    return (
      <div className="empty-state">No drug candidates match your filters.</div>
    );
  }

  return (
    <div className="drug-list">
      {drugs.map((drug) => (
        <DrugCard key={drug.id} drug={drug} />
      ))}
    </div>
  );
}
