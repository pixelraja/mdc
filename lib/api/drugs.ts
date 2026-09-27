import drugs from "@/data/drugs.json";
import type {
  DrugCandidate,
  DrugQuery,
  PaginatedDrugs,
} from "@/lib/types/drug";
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
export async function getDrugs(query: DrugQuery = {}): Promise<PaginatedDrugs> {
  await delay(150);
  const search = (query.search ?? "").trim().toLowerCase();
  const status = query.status ?? "";
  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, query.pageSize ?? 10));
  const filtered = (drugs as DrugCandidate[]).filter(
    (d) =>
      (!search ||
        [
          d.name,
          d.description,
          d.mechanismOfAction,
          d.sponsor,
          d.therapeuticArea,
        ].some((v) => v.toLowerCase().includes(search))) &&
      (!status || d.status === status),
  );
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  return {
    data: filtered.slice(start, start + pageSize),
    pagination: { page, pageSize, total, totalPages },
  };
}
export async function getDrugById(id: string) {
  await delay(100);
  return (drugs as DrugCandidate[]).find((d) => d.id === id) ?? null;
}
