import Image from "next/image";
import type { ReactNode } from "react";

interface HeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  backgroundImage?: string;
  desktopBackgroundImage?: string;
  size?: "default" | "large";
}

function HeroBackground({
  backgroundImage,
  desktopBackgroundImage,
  desktopFit = "cover",
}: {
  backgroundImage?: string;
  desktopBackgroundImage?: string;
  desktopFit?: "cover" | "contain";
}) {
  const desktopFitClass = desktopFit === "contain" ? "object-contain" : "object-cover object-top";
  const mobileImageDesktopClasses =
    desktopFit === "contain" ? "sm:object-contain" : "sm:object-cover sm:object-top";

  return (
    <>
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-contain ${desktopBackgroundImage ? "sm:hidden" : mobileImageDesktopClasses}`}
        />
      )}
      {desktopBackgroundImage && (
        <Image
          src={desktopBackgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`hidden sm:block ${desktopFitClass}`}
        />
      )}
    </>
  );
}

export function Hero({
  eyebrow,
  title,
  description,
  children,
  backgroundImage,
  desktopBackgroundImage,
  size = "default",
}: HeroProps) {
  if (size === "default") {
    return (
      <>
        <div className="relative h-[350px] overflow-hidden border-b border-black/10 bg-white">
          <HeroBackground
            backgroundImage={backgroundImage}
            desktopBackgroundImage={desktopBackgroundImage}
            desktopFit="contain"
          />
        </div>
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-xl text-lg text-zinc-600">{description}</p>
          )}
        </div>
      </>
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-black/10 bg-zinc-900 sm:flex sm:min-h-[92vh] sm:items-end">
      {backgroundImage && (
        <>
          <HeroBackground backgroundImage={backgroundImage} desktopBackgroundImage={desktopBackgroundImage} />
          <div className="absolute inset-0 bg-zinc-900/70" />
        </>
      )}
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-16">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-light">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-lg text-zinc-300">{description}</p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">{children}</div>}
      </div>
    </section>
  );
}
