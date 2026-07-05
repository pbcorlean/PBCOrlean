import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/Card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
};

// TODO: replace with the church's real leadership names/roles
const leadership = [
  { name: "Pastor Name", role: "Senior Pastor" },
  { name: "Leader Name", role: "Deacon" },
  { name: "Leader Name", role: "Ministry Leader" },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About Us"
        title={`Welcome to ${siteConfig.name}`}
        description={siteConfig.description}
        backgroundImage="/pictures/Hero-photo.png"
      />

      <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          eyebrow="Our Mission"
          title="Why We Gather"
          // TODO: replace with the church's actual mission statement
          description="We exist to worship God, grow in faith together, and serve our community in Orlean and beyond with the love of Christ."
        />
        <div className="relative aspect-video overflow-hidden rounded-xl">
          <Image
            src="/pictures/Church-picture.jpeg"
            alt={siteConfig.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-t border-black/10 bg-zinc-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <SectionHeading eyebrow="Leadership" title="Meet Our Leaders" />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {leadership.map((leader) => (
              <Card key={leader.role}>
                <p className="text-lg font-semibold text-zinc-900">{leader.name}</p>
                <p className="mt-1 text-sm text-zinc-600">{leader.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
