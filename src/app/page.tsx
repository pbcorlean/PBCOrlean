import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceTimesList } from "@/components/ServiceTimesList";
import { Button } from "@/components/Button";
import { fifthSundayNote, serviceTimes, siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Welcome"
        title={siteConfig.tagline}
        description={siteConfig.description}
        backgroundImage="/pictures/Hero-photo.png"
        size="large"
      >
        <Button href="/service-times">Plan Your Visit</Button>
        <Button href="/about" variant="secondary">
          Learn More About Us
        </Button>
      </Hero>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Join Us"
          title="Service Times"
          description="We'd love to have you worship with us."
        />
        <div className="mt-8">
          <ServiceTimesList services={serviceTimes} />
          <p className="mt-4 text-sm text-zinc-500">{fifthSundayNote}</p>
        </div>
      </section>

      <section className="border-t border-black/10 bg-zinc-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <SectionHeading
            eyebrow="Visit In Person"
            title="Find Us"
            description={`${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`}
          />
          <div className="mt-8">
            <Button href="/contact">Get Directions</Button>
          </div>
        </div>
      </section>
    </>
  );
}
