import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { MapEmbed } from "@/components/MapEmbed";
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
        backgroundImage="/pictures/Hero-photo.png"
        desktopBackgroundImage="/pictures/secondary-hero-desktop.png"
      />

      <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Reach Out" title="Send a Message" />
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>

        <div id="google-map" className="scroll-mt-24">
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
