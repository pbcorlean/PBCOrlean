import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Employment Opportunities",
  description: "Explore employment opportunities at Providence Baptist Church in Orlean, Virginia.",
};

export default function EmploymentPage() {
  return (
    <>
      <Hero
        eyebrow="Join Our Ministry"
        title="Employment Opportunities"
        description="Explore current opportunities to serve at Providence Baptist Church."
        backgroundImage="/pictures/Hero-photo.png"
        desktopBackgroundImage="/pictures/secondary-hero-desktop.png"
      />

      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Open Positions</h2>
        <p className="mt-2 text-zinc-600">Select a position to view the complete job description and application.</p>

        <div className="mt-8">
          <Link
            href="/employment/senior-pastor"
            className="group block rounded-2xl border border-primary/15 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-8"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Open Position</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 group-hover:text-primary">
                  Senior Pastor
                </h3>
                <p className="mt-2 text-zinc-600">Bivocational &middot; Orlean, Virginia &middot; Open until filled</p>
              </div>
              <span className="shrink-0 font-semibold text-primary group-hover:text-primary-dark">
                View job description &rarr;
              </span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
