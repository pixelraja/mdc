"use client";
import ErrorState from "@/components/ErrorState";
export default function Error() {
  return (
    <main className="container py-10">
      <ErrorState message="Something went wrong while loading this page." />
    </main>
  );
}
