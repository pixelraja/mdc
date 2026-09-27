import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container py-16 text-center">
      <h1 className="text-2xl font-bold">Drug candidate not found</h1>
      <Link href="/" className="mt-4 inline-block text-blue-600">
        Return to candidates
      </Link>
    </main>
  );
}
