"use client";

import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

function SearchIcon() {
  return (
    <svg
      className="search-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="10.8"
        cy="10.8"
        r="6.8"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16 16l5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [local, setLocal] = useState(value);
  const debouncedLocal = useDebounce(local);
  const previousDebounced = useRef(debouncedLocal);

  useEffect(() => setLocal(value), [value]);

  useEffect(() => {
    if (debouncedLocal === previousDebounced.current) return;
    previousDebounced.current = debouncedLocal;
    onChange(debouncedLocal);
  }, [debouncedLocal, onChange]);

  return (
    <label className="search-box">
      <SearchIcon />
      <input
        aria-label="Search drugs"
        className="search-input"
        value={local}
        onChange={(event) => setLocal(event.target.value)}
        placeholder="Search by name..."
      />
    </label>
  );
}
