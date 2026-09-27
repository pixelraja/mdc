import Link from "next/link";
import type { DrugCandidate } from "@/lib/types/drug";
import StatusBadge from "./StatusBadge";

export default function DrugCard({ drug }: { drug: DrugCandidate }) {
  return (
    <Link href={`/drugs/${drug.id}`} className="drug-row">
      <div className="drug-copy">
        <h2 className="drug-name">{drug.name}</h2>
        <p className="drug-description">{drug.description}</p>
      </div>
      <div className="drug-actions">
        <StatusBadge status={drug.status} />
        <span className="arrow" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}
