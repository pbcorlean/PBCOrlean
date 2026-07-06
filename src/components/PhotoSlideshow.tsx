"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface PhotoSlideshowProps {
  images: string[];
}

const AUTOPLAY_INTERVAL_MS = 4500;

export function PhotoSlideshow({ images }: PhotoSlideshowProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  function goTo(offset: number) {
    setIndex((current) => (current + offset + images.length) % images.length);
  }

  return (
    <div>
      <div className="relative h-[320px] overflow-hidden rounded-xl border border-black/10 bg-zinc-100 sm:h-[480px]">
        <Image
          key={images[index]}
          src={images[index]}
          alt=""
          fill
          sizes="(min-width: 1024px) 768px, 100vw"
          className="animate-photo-fade object-contain"
        />
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(-1)}
          aria-label="Previous photo"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-zinc-600 transition-colors hover:bg-zinc-50"
        >
          &lsaquo;
        </button>
        <p className="text-sm text-zinc-500">
          {index + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={() => goTo(1)}
          aria-label="Next photo"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-zinc-600 transition-colors hover:bg-zinc-50"
        >
          &rsaquo;
        </button>
      </div>
    </div>
  );
}
