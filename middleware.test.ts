import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "./middleware";

function createRequest(pathname: string, authenticated = false) {
	return new NextRequest(new URL(pathname, "http://localhost"), {
		headers: authenticated ? { cookie: "auth=test-token" } : undefined,
	});
}

describe("middleware", () => {
	it.each([
		"/login",
		"/api/auth/login",
		"/_next/static/chunk.js",
		"/favicon.ico",
	])("allows %s without authentication", (pathname) => {
		const response = middleware(createRequest(pathname));

		expect(response.status).toBe(200);
		expect(response.headers.get("x-middleware-next")).toBe("1");
	});

	it("returns 401 for an unauthenticated API request", async () => {
		const response = middleware(createRequest("/api/drugs"));

		expect(response.status).toBe(401);
		await expect(response.json()).resolves.toEqual({ message: "Unauthorized" });
	});

	it("redirects an unauthenticated page request to login", () => {
		const response = middleware(createRequest("/drugs"));

		expect(response.status).toBe(307);
		expect(response.headers.get("location")).toBe("http://localhost/login");
	});

	it.each(["/drugs", "/api/drugs"])(
		"allows authenticated request to %s",
		(pathname) => {
			const response = middleware(createRequest(pathname, true));

			expect(response.status).toBe(200);
			expect(response.headers.get("x-middleware-next")).toBe("1");
		},
	);
});
