import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { GET as getDrugList } from "@/app/api/drugs/route";
import { GET as getDrugDetails } from "@/app/api/drugs/[id]/route";
import { POST as login } from "@/app/api/auth/login/route";
import { POST as logout } from "@/app/api/auth/logout/route";
import type { PaginatedDrugs } from "@/lib/types/drug";

function createJsonPostRequest(path: string, body: string) {
  return new Request(`http://localhost${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });
}

describe("drug API routes", () => {
  it("returns a paginated drug list", async () => {
    const response = await getDrugList(
      new NextRequest("http://localhost/api/drugs"),
    );
    const result = (await response.json()) as PaginatedDrugs;

    expect(response.status).toBe(200);
    expect(result.data.length).toBeLessThanOrEqual(10);
    expect(result.pagination).toMatchObject({ page: 1, pageSize: 10 });
    expect(result.pagination.total).toBeGreaterThan(0);
  });

  it("applies search and pagination query parameters", async () => {
    const response = await getDrugList(
      new NextRequest(
        "http://localhost/api/drugs?search=Oncora&page=1&pageSize=2",
      ),
    );
    const result = (await response.json()) as PaginatedDrugs;

    expect(result.pagination).toMatchObject({ page: 1, pageSize: 2 });
    expect(result.data.length).toBeLessThanOrEqual(2);
    expect(result.data.every((drug) => drug.name.includes("Oncora"))).toBe(true);
  });

  it("filters the list by status", async () => {
    const response = await getDrugList(
      new NextRequest("http://localhost/api/drugs?status=Approved"),
    );
    const result = (await response.json()) as PaginatedDrugs;

    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every((drug) => drug.status === "Approved")).toBe(true);
  });

  it("returns the requested drug by id", async () => {
    const listResponse = await getDrugList(
      new NextRequest("http://localhost/api/drugs?pageSize=1"),
    );
    const { data } = (await listResponse.json()) as PaginatedDrugs;
    const drug = data[0];
    const response = await getDrugDetails(
      new Request(`http://localhost/api/drugs/${drug.id}`),
      { params: Promise.resolve({ id: drug.id }) },
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(drug);
  });

  it("returns 404 when a drug id does not exist", async () => {
    const response = await getDrugDetails(
      new Request("http://localhost/api/drugs/missing"),
      { params: Promise.resolve({ id: "missing" }) },
    );

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ message: "Drug not found" });
  });
});

describe("authentication API routes", () => {
  it("rejects invalid login credentials", async () => {
    const response = await login(
      createJsonPostRequest(
        "/api/auth/login",
        JSON.stringify({ username: "demo", password: "wrong" }),
      ),
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      message: "Invalid credentials",
    });
  });

  it("rejects malformed login JSON", async () => {
    const response = await login(createJsonPostRequest("/api/auth/login", "{"));

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      message: "Invalid credentials",
    });
  });

  it("redirects valid login and sets the auth cookie", async () => {
    const response = await login(
      createJsonPostRequest(
        "/api/auth/login",
        JSON.stringify({ username: "demo", password: "demo123" }),
      ),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/");
    expect(response.cookies.get("auth")).toMatchObject({
      value: "demo-token",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });
  });

  it("redirects logout to login and clears the auth cookie", async () => {
    const response = await logout(
      new Request("http://localhost/api/auth/logout", { method: "POST" }),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/login");
    expect(response.cookies.get("auth")?.value).toBe("");
  });
});