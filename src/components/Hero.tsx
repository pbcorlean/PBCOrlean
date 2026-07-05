import Image from "next/image";
import type { ReactNode } from "react";

interface HeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  backgroundImage?: string;
}

export function Hero({ eyebrow, title, description, children, backgroundImage }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-black/10 bg-zinc-900">
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
          <div className="absolute inset-0 bg-zinc-900/70" />
        </>
      )}
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-light">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-lg text-zinc-300">{description}</p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
      </div>
    </section>
  );
}
