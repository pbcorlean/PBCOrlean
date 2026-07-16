import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { liveStream, sermons } from "@/lib/sermons";

export const metadata: Metadata = {
  title: "Sermons",
  description: "Watch Providence Baptist Church live and revisit previous sermons.",
};

function formatSermonDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function SermonsPage() {
  return (
    <>
      <Hero
        eyebrow="Media"
        title="Sermons"
        description="Worship with us live or catch up on messages from previous services."
        backgroundImage="/pictures/Hero-photo.png"
        desktopBackgroundImage="/pictures/secondary-hero-desktop.png"
      />

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Worship Online"
          title="Watch Live"
          description="Join our worship service from wherever you are."
        />

        <div className="mt-8 overflow-hidden rounded-2xl border border-primary/10 bg-primary-dark shadow-lg">
          {liveStream.embedUrl ? (
            <iframe
              src={liveStream.embedUrl}
              title="Providence Baptist Church livestream"
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="flex aspect-video min-h-72 flex-col items-center justify-center px-6 text-center text-white">
              <span className="rounded-full bg-secondary px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary-dark">
                Coming Soon
              </span>
              <h2 className="mt-5 text-2xl font-bold sm:text-3xl">Livestream will appear here</h2>
              <p className="mt-3 max-w-xl text-sm text-primary-light sm:text-base">
                We are preparing online worship. Once the church&apos;s streaming channel is connected,
                you will be able to watch services directly from this page.
              </p>
            </div>
          )}
        </div>

        {liveStream.watchUrl && (
          <p className="mt-4 text-center text-sm text-zinc-600">
            Having trouble with the player?{" "}
            <a
              href={liveStream.watchUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-4"
            >
              Watch on our streaming channel
            </a>
          </p>
        )}
      </section>

      <section className="border-t border-primary/10 bg-primary/5">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <SectionHeading
            eyebrow="Sermon Library"
            title="Previous Sermons"
            description="Watch previous messages and revisit them anytime."
          />

          {sermons.length > 0 ? (
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {sermons.map((sermon) => (
                <article key={sermon.id} className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
                  <a href={sermon.videoUrl} target="_blank" rel="noreferrer" className="group block">
                    <div className="flex aspect-video items-center justify-center bg-primary-dark text-white transition-colors group-hover:bg-primary">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-xl text-primary-dark" aria-hidden="true">
                        ▶
                      </span>
                      <span className="sr-only">Watch {sermon.title}</span>
                    </div>
                    <div className="p-6">
                      <p className="text-sm font-medium text-primary">{formatSermonDate(sermon.date)}</p>
                      <h2 className="mt-2 text-lg font-semibold text-zinc-900">{sermon.title}</h2>
                      <p className="mt-1 text-sm text-zinc-500">{sermon.speaker}</p>
                      {sermon.summary && <p className="mt-3 text-sm text-zinc-600">{sermon.summary}</p>}
                    </div>
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-dashed border-primary/20 bg-white px-6 py-12 text-center">
              <h2 className="text-xl font-semibold text-zinc-900">Recordings are coming soon</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-600">
                Previous services will be added here as recordings become available.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
