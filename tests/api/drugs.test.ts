import { describe, it, expect } from "vitest";
import { getDrugs } from "@/lib/api/drugs";
describe("getDrugs", () => {
  it("filters and paginates", async () => {
    const r = await getDrugs({ search: "Oncora", page: 1, pageSize: 2 });
    expect(r.pagination.total).toBeGreaterThan(0);
    expect(r.data.every((d) => d.name.includes("Oncora"))).toBe(true);
    expect(r.data.length).toBeLessThanOrEqual(2);
  });
  it("filters by status", async () => {
    const r = await getDrugs({ status: "Approved" });
    expect(r.data.every((d) => d.status === "Approved")).toBe(true);
  });
});
