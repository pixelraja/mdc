"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("drug-theme");

    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    window.localStorage.setItem("drug-theme", next ? "dark" : "light");
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="app-header">
      <div className="page-container header-inner">
        <Link href="/" className="brand" aria-label="Drug Candidates home">
          
          <span>Merck</span>
        </Link>

        <div className="header-actions">
          <span className="header-signed">
            Signed in as <strong>demo</strong>
          </span>
          <button type="button" className="signout" onClick={logout}>
            Sign out
          </button>
          <button
            type="button"
            className="theme-button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {dark ? "☀" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}
