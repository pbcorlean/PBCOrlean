import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Card } from "@/components/Card";
import { sermons } from "@/lib/sermons";

export const metadata: Metadata = {
  title: "Sermons",
};

export default function SermonsPage() {
  return (
    <>
      <Hero
        eyebrow="Media"
        title="Sermons"
        description="Catch up on recent messages from our worship gatherings."
      />

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sermons.map((sermon) => (
            <Card key={sermon.id}>
              <p className="text-sm font-medium text-primary">
                {new Date(sermon.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="mt-2 text-lg font-semibold text-zinc-900">{sermon.title}</p>
              <p className="mt-1 text-sm text-zinc-500">{sermon.speaker}</p>
              <p className="mt-3 text-sm text-zinc-600">{sermon.summary}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
