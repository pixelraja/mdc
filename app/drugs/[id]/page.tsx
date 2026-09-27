import { notFound } from "next/navigation";
import Link from "next/link";
import { getDrugById } from "@/lib/api/drugs";
import StatusBadge from "@/components/StatusBadge";
export default async function DrugDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const drug = await getDrugById(id);
  if (!drug) notFound();
  return (
    <main className="page-container main-content">
      <Link href="/" className="text-sm text-blue-600">
        ← Back to candidates
      </Link>
      <article className="mt-6 rounded-xl border-[#cbd5e1]  p-8 drug-detail shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div>
            <h1 className="text-3xl font-bold">{drug.name}</h1>
            <p className="mt-2 text-slate-500">
              {drug.therapeuticArea} · {drug.sponsor}
            </p>
          </div>
          <StatusBadge status={drug.status} />
        </div>
        <section className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-semibold">Description</h2>
            <p className="mt-2 leading-7 text-slate-600">{drug.description}</p>
          </div>
          <div>
            <h2 className="font-semibold">Mechanism of Action</h2>
            <p className="mt-2 leading-7 text-slate-600">
              {drug.mechanismOfAction}
            </p>
          </div>
          <div>
            <h2 className="font-semibold">Known / Reported Side Effects</h2>
            <ul className="mt-2 list-disc pl-5 text-slate-600">
              {drug.sideEffects.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-semibold">Last Updated</h2>
            <p className="mt-2 text-slate-600">{drug.dateUpdated}</p>
          </div>
        </section>
      </article>
    </main>
  );
}
