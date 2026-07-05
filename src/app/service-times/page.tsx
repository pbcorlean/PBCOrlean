import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceTimesList } from "@/components/ServiceTimesList";
import { serviceTimes, siteConfig } from "@/lib/site-config";

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
      />

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <ServiceTimesList services={serviceTimes} />
      </section>

      <section className="border-t border-black/10 bg-zinc-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <SectionHeading
            eyebrow="Location"
            title="Getting Here"
            description={`${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`}
          />
          {/* TODO: replace with an embedded Google Maps iframe using the church's address */}
          <div className="mt-8 flex h-72 items-center justify-center rounded-xl border border-dashed border-black/20 bg-white text-sm text-zinc-500">
            Map placeholder
          </div>
        </div>
      </section>
    </>
  );
}
