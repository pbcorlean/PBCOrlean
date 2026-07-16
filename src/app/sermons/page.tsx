import type { Metadata } from "next";
import { headers } from "next/headers";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { sermonPlaylist } from "@/lib/sermons";
import { getActiveYouTubeStream, getYouTubePlaylistSermons } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Sermons",
  description: "Watch Providence Baptist Church live and revisit previous sermons.",
};

function formatSermonDate(date?: string) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function SermonsPage() {
  const [activeStream, playlistSermons] = await Promise.all([
    getActiveYouTubeStream(),
    getYouTubePlaylistSermons(),
  ]);
  const requestHeaders = await headers();
  const embedDomain = (requestHeaders.get("host") ?? "pbcorlean.org").split(":")[0];
  const liveChatUrl = activeStream
    ? `https://www.youtube.com/live_chat?v=${activeStream.videoId}&embed_domain=${encodeURIComponent(embedDomain)}`
    : null;

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
            title={activeStream.title}
            description={
              formatSermonDate(activeStream.publishedAt)
                ? `Streaming live on ${formatSermonDate(activeStream.publishedAt)}`
                : "Join our worship service from wherever you are."
            }
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="overflow-hidden rounded-2xl border border-primary/10 bg-primary-dark shadow-lg">
              <iframe
                src={activeStream.embedUrl}
                title={activeStream.title}
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            {liveChatUrl && (
              <div className="hidden overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-lg lg:block">
                <iframe
                  src={liveChatUrl}
                  title="Providence Baptist Church livestream chat"
                  className="h-full min-h-[420px] w-full"
                />
              </div>
            )}
          </div>
          <p className="mt-4 text-center text-sm text-zinc-600">
            <span className="lg:hidden">To comment during the service, </span>
            <span className="hidden lg:inline">Having trouble with the player or chat? </span>
            <a
              href={activeStream.watchUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-4"
            >
              Watch and join the live chat on YouTube
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

          {playlistSermons.length > 0 ? (
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {playlistSermons.map((sermon) => (
                <article key={sermon.videoId} className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-lg">
                  <iframe
                    src={sermon.embedUrl}
                    title={sermon.title}
                    className="aspect-video w-full bg-primary-dark"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-zinc-900">{sermon.title}</h2>
                    {formatSermonDate(sermon.publishedAt) && (
                      <p className="mt-1 text-sm text-zinc-600">Recorded {formatSermonDate(sermon.publishedAt)}</p>
                    )}
                    <a href={sermon.watchUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-4">
                      Watch on YouTube
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 overflow-hidden rounded-2xl border border-primary/10 bg-primary-dark shadow-lg">
              <iframe
                src={sermonPlaylist.embedUrl}
                title="Providence Baptist Church previous sermons"
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}
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

          </div>
        </section>
      )}
    </>
  );
}
