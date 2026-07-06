import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceTimesList } from "@/components/ServiceTimesList";
import { MapEmbed } from "@/components/MapEmbed";
import { fifthSundayNote, serviceTimes, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Service Times",
};

export default function ServiceTimesPage() {
  return (
    <>
      <Hero
        eyebrow="Join Us"
        title="Service Times"
        description="We'd love for you to worship with us. Here's when we gather each week."
        backgroundImage="/pictures/Hero-photo.png"
        desktopBackgroundImage="/pictures/secondary-hero-desktop.png"
      />

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <ServiceTimesList services={serviceTimes} />
        <p className="mt-4 text-sm text-zinc-500">{fifthSundayNote}</p>
      </section>

      <section className="border-t border-black/10 bg-zinc-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <SectionHeading
            eyebrow="Location"
            title="Getting Here"
            description={`${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`}
          />
          <div className="mt-8">
            <MapEmbed
              address={`${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`}
            />
          </div>
        </div>
      </section>
    </>
  );
}
