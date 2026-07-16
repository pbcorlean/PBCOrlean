import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Senior Pastor Employment Opportunity",
  description:
    "Providence Baptist Church in Orlean, Virginia is seeking a bivocational Senior Pastor.",
};

export default function SeniorPastorPage() {
  return (
    <>
      <Hero
        eyebrow="Employment Opportunity"
        title="Senior Pastor"
        description="A Going Church for a Coming Christ!"
        backgroundImage="/pictures/Hero-photo.png"
        desktopBackgroundImage="/pictures/secondary-hero-desktop.png"
      />

      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <Link href="/employment" className="text-sm font-semibold text-primary hover:text-primary-dark">
          &larr; All employment opportunities
        </Link>

        <div className="mt-8 space-y-6 text-base leading-7 text-zinc-700">
          <div className="flex flex-wrap gap-2 text-sm font-medium text-zinc-600">
            <span className="rounded-full bg-primary/10 px-3 py-1">Bivocational</span>
            <span className="rounded-full bg-primary/10 px-3 py-1">Orlean, Virginia</span>
            <span className="rounded-full bg-primary/10 px-3 py-1">Open until filled</span>
          </div>

          <p>
            <strong className="text-zinc-900">Providence Baptist Church (PBC)</strong>, a
            Christ-centered, Bible-believing congregation located in the beautiful community of
            Orlean, Virginia, is seeking a Senior Pastor. Our mission is centered on the Great
            Commission in Matthew 28:19, making disciples by spreading the good news of Jesus
            Christ. We seek a Senior Pastor who is called by God to provide spiritual leadership,
            biblical preaching, pastoral care, and vision for the continued growth and health of
            our church family. We seek a Pastor called by God with a unique vision to lead a
            congregation in a rural setting with changing demographics.
          </p>

          <div className="rounded-2xl border border-primary/10 bg-primary/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Position Summary</h2>
            <div className="mt-5 space-y-5">
              <p>
                This is a bivocational position. The Pastor will serve as the primary spiritual
                leader of the congregation, demonstrating a commitment to scripture, a passion for
                discipleship, and a heart for shepherding God&apos;s people. Duties include, but are
                not limited to, biblical preaching and teaching, serving communion, visiting the
                sick, and other pastoral care. Duties are performed with a vision for the continued
                growth and health of the congregation in partnership with the church staff and
                ministry leaders.
              </p>
              <p>
                Maintaining a positive workplace environment is vital. The successful candidate
                will cultivate a professional environment where teamwork is valued, and all
                individuals are respected and appreciated for their skills and talents.
              </p>
              <p>
                New hires must provide proof of identity and eligibility to work in the United
                States and are subject to a criminal background check and screening by the
                Department of Social Services.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">How to Apply</h2>
            <p className="mt-4">
              Download and complete the PBC Pastor Application, then email the completed
              application to{" "}
              <a
                href="mailto:info@pbcorlean.org?subject=Senior%20Pastor%20Application"
                className="font-semibold text-primary underline hover:text-primary-dark"
              >
                info@pbcorlean.org
              </a>
              . The position is open until filled.
            </p>
            <div className="mt-6">
              <Button href="/downloads/Providence-Pastor-Application-2026-Fillable.pdf" newTab>
                Download Fillable Application
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
