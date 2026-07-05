import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { EventCalendar } from "@/components/EventCalendar";
import { getCalendarSources, getEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events",
};

// Re-fetch the calendar feed(s) at most every 5 minutes so the page stays
// close to real-time without hitting the calendar on every page view.
export const revalidate = 300;

function toWebcalUrl(url: string) {
  return url.replace(/^https?:\/\//, "webcal://");
}

export default async function EventsPage() {
  const [events, calendarSources] = await Promise.all([getEvents(), Promise.resolve(getCalendarSources())]);

  return (
    <>
      <Hero
        eyebrow="What's Happening"
        title="Upcoming Events"
        description="Stay connected with what's going on in our church family."
        backgroundImage="/pictures/Hero-photo.png"
      />

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        {calendarSources.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-3">
            {calendarSources.map((source) => (
              <a
                key={source.url}
                href={toWebcalUrl(source.url)}
                className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
              >
                Subscribe to {source.label}
              </a>
            ))}
          </div>
        )}

        <EventCalendar events={events} />
      </section>
    </>
  );
}
