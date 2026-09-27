"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "@/components/SearchBar";
import StatusFilter from "@/components/StatusFilter";
import DrugList from "@/components/DrugList";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorState from "@/components/ErrorState";

async function fetchDrugs(search: string, status: string, page: number) {
  const response = await fetch(
    `/api/drugs?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}&page=${page}&pageSize=10`,
  );
  if (!response.ok) throw new Error("Unable to load drugs");
  return response.json();
}

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "";
  const page = Number(searchParams.get("page") ?? 1);

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(searchParams.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      if (key !== "page") next.delete("page");
      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [searchParams, router, pathname],
  );

  const { data, isPending, isError } = useQuery({
    queryKey: ["drugs", { search, status, page }],
    queryFn: () => fetchDrugs(search, status, page),
    placeholderData: (previous) => previous,
  });

  const totalPages = data?.pagination?.totalPages ?? 1;

  return (
    <main className="page-container main-content">
      <h1 className="page-title">Drug Candidates</h1>

      <div className="filters">
        <SearchBar
          value={search}
          onChange={(value) => update("search", value)}
        />
        <StatusFilter
          value={status}
          onChange={(value) => update("status", value)}
        />
      </div>

      {isPending ? (
        <LoadingSkeleton />
      ) : isError ? (
        <ErrorState message="Unable to load drug candidates." />
      ) : (
        <>
          <DrugList drugs={data.data} />
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={page <= 1}
                onClick={() => update("page", String(page - 1))}
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => update("page", String(page + 1))}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
