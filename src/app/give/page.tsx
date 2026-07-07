import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/Card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Give",
};

export default function GivePage() {
  return (
    <>
      <Hero
        eyebrow="Generosity"
        title="Give"
        description="Your generosity helps support our church family and our ministry in the Orlean community."
        backgroundImage="/pictures/Hero-photo.png"
        desktopBackgroundImage="/pictures/secondary-hero-desktop.png"
      />

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <SectionHeading eyebrow="Ways to Give" title="Support Our Ministry" />

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Card>
            <p className="text-lg font-semibold text-zinc-900">Online</p>
            <p className="mt-2 text-sm text-zinc-600">
              Give securely online through Tithe.ly.
            </p>
            <a
              href={siteConfig.givingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Give Online
            </a>
          </Card>

          <Card>
            <p className="text-lg font-semibold text-zinc-900">By Mail</p>
            <p className="mt-2 text-sm text-zinc-600">
              Checks can be mailed or dropped off at:
            </p>
            <address className="mt-3 text-sm not-italic text-zinc-600">
              {siteConfig.name}
              <br />
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
            </address>
          </Card>

          <Card>
            <p className="text-lg font-semibold text-zinc-900">In Person</p>
            <p className="mt-2 text-sm text-zinc-600">
              Offering is collected during our Sunday Service, held at 11:00 AM
              on the 1st, 2nd, and 3rd Sundays and 10:00 AM on the 4th Sunday
              of each month.
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
