import { NextRequest, NextResponse } from "next/server";
import { getDrugs } from "@/lib/api/drugs";
import type { DrugStatus } from "@/lib/types/drug";
export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;

  const result = await getDrugs({
    search: p.get("search") ?? "",
    status: (p.get("status") ?? "") as DrugStatus,
    page: Number(p.get("page") ?? 1),
    pageSize: Number(p.get("pageSize") ?? 10),
  });
  return NextResponse.json(result);
}
