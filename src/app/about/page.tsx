import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { PhotoSlideshow } from "@/components/PhotoSlideshow";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
};

const photoAlbumDir = path.join(process.cwd(), "public", "pictures", "photo-album");
const photoAlbum = fs
  .readdirSync(photoAlbumDir)
  .filter((file) => /\.(jpe?g|png)$/i.test(file))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((file) => `/pictures/photo-album/${file}`);

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About Us"
        title={`Welcome to ${siteConfig.name}`}
        description={siteConfig.description}
        backgroundImage="/pictures/Hero-photo.png"
        desktopBackgroundImage="/pictures/secondary-hero-desktop.png"
      />

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <SectionHeading eyebrow="Gallery" title="Photo Album" />
        <div className="mt-8">
          <PhotoSlideshow images={photoAlbum} />
        </div>
      </section>

      <section className="border-t border-black/10 bg-zinc-50">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center">
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
        </div>
      </section>
    </>
  );
}
