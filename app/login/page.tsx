"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);
    const r = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: f.get("username"),
        password: f.get("password"),
      }),
    });
    if (r.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError("Invalid credentials. Use demo / demo123.");
      setBusy(false);
    }
  }
  async function skip() {
    setBusy(true);
    await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "demo", password: "demo123" }),
    });
    router.push("/");
    router.refresh();
  }
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="mt-2 text-sm text-slate-500">
          Demo credentials: demo / demo123
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            name="username"
            defaultValue="demo"
            className="w-full rounded-md border px-3 py-2"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            defaultValue="demo123"
            className="w-full rounded-md border px-3 py-2"
            placeholder="Password"
          />
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
          <button
            disabled={busy}
            className="w-full rounded-md bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
          >
            Sign in
          </button>
        </form>
        <button
          disabled={busy}
          onClick={skip}
          className="mt-3 w-full rounded-md border px-4 py-2"
        >
          Skip login (demo)
        </button>
        <p className="mt-4 text-xs text-slate-500">
          The demo shortcut uses the same HTTP-only cookie flow and is not
          intended for production authentication.
        </p>
      </div>
    </main>
  );
}
