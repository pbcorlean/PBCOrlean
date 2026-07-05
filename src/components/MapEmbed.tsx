interface MapEmbedProps {
  address: string;
  className?: string;
}

export function MapEmbed({ address, className = "" }: MapEmbedProps) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <iframe
      src={src}
      title={`Map showing ${address}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className={`h-72 w-full rounded-xl border border-black/10 ${className}`}
    />
  );
}
