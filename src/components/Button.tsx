import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function Button({ href, children, variant = "primary" }: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:px-6 sm:py-3 sm:text-sm";
  const variantClasses =
    variant === "primary"
      ? "bg-primary text-black hover:bg-primary-dark"
      : "border border-white/30 text-white hover:bg-white/10";

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses}`}>
      {children}
    </Link>
  );
}
