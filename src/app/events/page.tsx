import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Card } from "@/components/Card";
import { events } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events",
};

export default function EventsPage() {
  return (
    <>
      <Hero
        eyebrow="What's Happening"
        title="Upcoming Events"
        description="Stay connected with what's going on in our church family."
        backgroundImage="/pictures/Hero-photo.png"
      />

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id}>
              <p className="text-sm font-medium text-primary">
                {new Date(event.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="mt-2 text-lg font-semibold text-zinc-900">{event.title}</p>
              <p className="mt-1 text-sm text-zinc-500">{event.time}</p>
              <p className="mt-3 text-sm text-zinc-600">{event.description}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
