"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navItems, siteConfig } from "@/lib/site-config";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollY = useRef(0);

  const lastToggleAt = useRef(0);

  useEffect(() => {
    const SCROLL_THRESHOLD = 20;
    const COMPACT_BREAKPOINT = 768;
    const TOGGLE_COOLDOWN_MS = 400;

    function handleScroll() {
      // Only collapse on desktop-width screens; leave mobile alone.
      if (window.innerWidth < COMPACT_BREAKPOINT) {
        setIsCompact(false);
        return;
      }

      // Ignore scroll events while the previous toggle's transition is
      // still settling, so the resulting layout shift isn't mistaken
      // for further user scrolling.
      const now = Date.now();
      if (now - lastToggleAt.current < TOGGLE_COOLDOWN_MS) return;

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY <= 80) {
        setIsCompact(false);
        lastToggleAt.current = now;
        lastScrollY.current = currentY;
      } else if (delta > SCROLL_THRESHOLD) {
        setIsCompact(true);
        lastToggleAt.current = now;
        lastScrollY.current = currentY;
      } else if (delta < -SCROLL_THRESHOLD) {
        setIsCompact(false);
        lastToggleAt.current = now;
        lastScrollY.current = currentY;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-[padding] duration-300 ${
          isCompact ? "py-2" : "py-4"
        }`}
      >
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/pictures/PBCOrlean-logo.png"
            alt={siteConfig.name}
            width={48}
            height={48}
            className={`rounded-full object-cover transition-[height,width] duration-300 ${
              isCompact ? "h-9 w-9" : "h-12 w-12"
            }`}
            priority
          />
          <span className="text-lg font-semibold tracking-tight text-zinc-900">
            {siteConfig.shortName}
          </span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-zinc-700 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span className="h-0.5 w-6 bg-current" />
            <span className="h-0.5 w-6 bg-current" />
            <span className="h-0.5 w-6 bg-current" />
          </div>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="flex flex-col gap-1 border-t border-primary/10 px-6 py-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md px-2 py-2 text-sm font-medium text-zinc-600 hover:bg-primary/5 hover:text-zinc-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}

      <div className="h-1 bg-gradient-to-r from-primary to-secondary" />
    </header>
  );
}
