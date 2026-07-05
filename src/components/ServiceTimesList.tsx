import type { ServiceTime } from "@/lib/site-config";
import { Card } from "@/components/Card";

interface ServiceTimesListProps {
  services: ServiceTime[];
}

export function ServiceTimesList({ services }: ServiceTimesListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {services.map((service) => (
        <Card key={service.name}>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {service.day}
          </p>
          <p className="mt-1 text-xl font-bold text-zinc-900">{service.name}</p>
          <p className="mt-1 text-lg text-zinc-700">{service.time}</p>
          {service.description && (
            <p className="mt-3 text-sm text-zinc-600">{service.description}</p>
          )}
        </Card>
      ))}
    </div>
  );
}
