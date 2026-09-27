import { NextResponse } from "next/server";
import { getDrugById } from "@/lib/api/drugs";
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const drug = await getDrugById(id);
  if (!drug)
    return NextResponse.json({ message: "Drug not found" }, { status: 404 });
  return NextResponse.json(drug);
}
