import Image from "next/image";
import type { ReactNode } from "react";

interface HeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  backgroundImage?: string;
  size?: "default" | "large";
}

export function Hero({
  eyebrow,
  title,
  description,
  children,
  backgroundImage,
  size = "default",
}: HeroProps) {
  if (size === "default") {
    return (
      <>
        <div className="relative h-56 overflow-hidden border-b border-black/10 bg-zinc-900 sm:h-72">
          {backgroundImage && (
            <Image
              src={backgroundImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-contain sm:object-cover sm:object-top"
            />
          )}
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
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-contain sm:object-cover sm:object-top"
          />
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
