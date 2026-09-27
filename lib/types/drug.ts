export const DRUG_STATUSES = [
  "In Development",
  "Approved",
  "Discontinued",
  "Phase I",
  "Phase II",
  "Phase III",
] as const;
export type DrugStatus = (typeof DRUG_STATUSES)[number];
export interface DrugCandidate {
  id: string;
  name: string;
  status: DrugStatus;
  description: string;
  mechanismOfAction: string;
  sideEffects: string[];
  sponsor: string;
  therapeuticArea: string;
  dateUpdated: string;
}
export interface DrugQuery {
  search?: string;
  status?: DrugStatus | "";
  page?: number;
  pageSize?: number;
}
export interface PaginatedDrugs {
  data: DrugCandidate[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
