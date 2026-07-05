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
      />

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <SectionHeading eyebrow="Ways to Give" title="Support Our Ministry" />

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Card>
            <p className="text-lg font-semibold text-zinc-900">Online</p>
            <p className="mt-2 text-sm text-zinc-600">
              Give securely online. {/* TODO: connect a giving processor (e.g. Tithe.ly, Givelify, PayPal Giving Fund) and link the button below */}
            </p>
            <button
              type="button"
              disabled
              className="mt-4 w-full cursor-not-allowed rounded-full bg-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-500"
              title="Online giving is not set up yet"
            >
              Give Online (Coming Soon)
            </button>
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
              Offering is collected during our Sunday Service, held 11:00 AM &ndash;
              1:00 PM on the first four Sundays of each month.
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
