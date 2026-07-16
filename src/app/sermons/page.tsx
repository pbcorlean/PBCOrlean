import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { sermonPlaylist, sermons } from "@/lib/sermons";
import { getActiveYouTubeStream } from "@/lib/youtube";

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

export default async function SermonsPage() {
  const activeStream = await getActiveYouTubeStream();

  return (
    <>
      <Hero
        eyebrow="Media"
        title="Sermons"
        description="Worship with us live or catch up on messages from previous services."
        backgroundImage="/pictures/Hero-photo.png"
        desktopBackgroundImage="/pictures/secondary-hero-desktop.png"
      />

      {activeStream ? (
        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <SectionHeading
            eyebrow="Live Now"
            title="Watch Live"
            description="Join our worship service from wherever you are."
          />

          <div className="mt-8 overflow-hidden rounded-2xl border border-primary/10 bg-primary-dark shadow-lg">
            <iframe
              src={activeStream.embedUrl}
              title="Providence Baptist Church livestream"
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="mt-4 text-center text-sm text-zinc-600">
            Having trouble with the player?{" "}
            <a
              href={activeStream.watchUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-4"
            >
              Watch on our streaming channel
            </a>
          </p>
        </section>
      ) : (
        <section className="border-t border-primary/10 bg-primary/5">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <SectionHeading
            eyebrow="Sermon Library"
            title="Previous Sermons"
            description="Watch previous services and revisit them anytime."
          />

          <div className="mt-8 overflow-hidden rounded-2xl border border-primary/10 bg-primary-dark shadow-lg">
            <iframe
              src={sermonPlaylist.embedUrl}
              title="Providence Baptist Church previous sermons"
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="mt-4 text-center text-sm text-zinc-600">
            <a
              href={sermonPlaylist.watchUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-4"
            >
              View the complete sermon playlist on YouTube
            </a>
          </p>

          {sermons.length > 0 ? (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
          ) : null}
          </div>
        </section>
      )}
    </>
  );
}
