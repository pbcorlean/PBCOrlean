import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceTimesList } from "@/components/ServiceTimesList";
import { Button } from "@/components/Button";
import { serviceTimes, siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Welcome"
        title={siteConfig.tagline}
        description={siteConfig.description}
        backgroundImage="/pictures/Hero-photo.png"
        desktopBackgroundImage="/pictures/Homepage-hero-desktop.png"
        size="large"
      >
        <Button href="/events">Plan Your Visit</Button>
        <Button href="/about" variant="secondary">
          Learn More About Us
        </Button>
      </Hero>

      <section className="border-b border-primary/10 bg-secondary/15">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">We&apos;re Hiring</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
              Providence Baptist Church is seeking a Senior Pastor
            </h2>
            <p className="mt-2 text-zinc-600">Bivocational position &middot; Open until filled</p>
          </div>
          <div className="shrink-0">
            <Button href="/employment">View Opportunity</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Join Us"
          title="Service Times"
          description="We'd love to have you worship with us."
        />
        <div className="mt-8">
          <ServiceTimesList services={serviceTimes} />
        </div>
      </section>

      <section className="border-t border-primary/10 bg-primary/15">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <SectionHeading
            eyebrow="Visit In Person"
            title="Find Us"
            description={`${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`}
          />
          <div className="mt-8">
            <Button href="/contact#google-map">Get Directions</Button>
          </div>
        </div>
      </section>
    </>
  );
}
