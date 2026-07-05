import Image from "next/image";
import Link from "next/link";
import { navItems, serviceTimes, siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-zinc-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-3">
        <div>
          <Image
            src="/pictures/PBCOrlean-logo.png"
            alt={siteConfig.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
          />
          <p className="mt-3 text-lg font-semibold text-zinc-900">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-zinc-600">{siteConfig.tagline}</p>
          <ul className="mt-4 flex gap-4 text-sm text-zinc-600">
            {siteConfig.social.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-zinc-900" target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-900">Contact</p>
          <address className="mt-2 space-y-1 text-sm not-italic text-zinc-600">
            <p>{siteConfig.address.street}</p>
            <p>
              {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
            </p>
            <p>
              <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`} className="hover:text-zinc-900">
                {siteConfig.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-zinc-900">
                {siteConfig.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-900">Service Times</p>
          <ul className="mt-2 space-y-1 text-sm text-zinc-600">
            {serviceTimes.map((service) => (
              <li key={service.name}>
                {service.day} &middot; {service.time}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-black/10 px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <nav className="flex gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-zinc-700">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
