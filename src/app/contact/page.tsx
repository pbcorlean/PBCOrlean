import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Get In Touch"
        title="Contact Us"
        description="Have a question or want to get connected? We'd love to hear from you."
      />

      <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Reach Out" title="Send a Message" />
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="Details" title="Our Location" />
          <address className="mt-6 space-y-2 text-sm not-italic text-zinc-600">
            <p>{siteConfig.address.street}</p>
            <p>
              {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
            </p>
            <p>
              <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`} className="hover:text-zinc-900">
                {siteConfig.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-zinc-900">
                {siteConfig.email}
              </a>
            </p>
          </address>

          {/* TODO: replace with an embedded Google Maps iframe using the church's address */}
          <div className="mt-8 flex h-72 items-center justify-center rounded-xl border border-dashed border-black/20 bg-zinc-50 text-sm text-zinc-500">
            Map placeholder
          </div>
        </div>
      </section>
    </>
  );
}
