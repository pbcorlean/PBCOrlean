import ical from "node-ical";

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
}

export interface CalendarSource {
  label: string;
  url: string;
}

const RANGE_DAYS_AHEAD = 365;

// CALENDAR_ICS_URLS holds one or more published Outlook "ICS" links, as
// `Label|https://...` pairs separated by commas, e.g.
// CALENDAR_ICS_URLS=Events|https://outlook.office365.com/owa/calendar/.../calendar.ics
export function getCalendarSources(): CalendarSource[] {
  const raw = process.env.CALENDAR_ICS_URLS ?? "";
  return raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [label, url] = entry.includes("|") ? entry.split("|") : ["Calendar", entry];
      return { label: label.trim(), url: url.trim() };
    });
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function toChurchEvent(
  id: string,
  summary: string | undefined,
  description: string | undefined,
  start: Date,
  end: Date,
  allDay: boolean,
): ChurchEvent {
  const time = allDay ? "All Day" : `${formatTime(start)} - ${formatTime(end)}`;

  return {
    id,
    title: summary || "Untitled Event",
    date: start.toISOString().slice(0, 10),
    time,
    description: (description ?? "").replace(/<[^>]*>/g, "").trim(),
  };
}

async function fetchCalendarEvents(url: string): Promise<ChurchEvent[]> {
  const data = await ical.async.fromURL(url);
  const now = new Date();
  const rangeEnd = new Date(now.getTime() + RANGE_DAYS_AHEAD * 24 * 60 * 60 * 1000);
  const events: ChurchEvent[] = [];

  for (const component of Object.values(data)) {
    if (!component || component.type !== "VEVENT" || !component.start) continue;

    const allDay = component.datetype === "date";

    if (component.rrule) {
      const occurrences = component.rrule.between(now, rangeEnd, true);
      const durationMs = component.end ? component.end.getTime() - component.start.getTime() : 0;

      for (const occurrence of occurrences) {
        const dateKey = occurrence.toISOString().slice(0, 10);
        if (component.exdate?.[dateKey]) continue;

        const recurrence = component.recurrences?.[dateKey];
        const start = recurrence?.start ?? occurrence;
        const end = recurrence?.end ?? (durationMs ? new Date(occurrence.getTime() + durationMs) : start);

        events.push(
          toChurchEvent(
            `${component.uid}-${dateKey}`,
            recurrence?.summary ?? component.summary,
            recurrence?.description ?? component.description,
            start,
            end,
            allDay,
          ),
        );
      }
    } else if (component.start >= now && component.start <= rangeEnd) {
      events.push(
        toChurchEvent(component.uid, component.summary, component.description, component.start, component.end ?? component.start, allDay),
      );
    }
  }

  return events;
}

export async function getEvents(): Promise<ChurchEvent[]> {
  const sources = getCalendarSources();
  if (sources.length === 0) return [];

  const results = await Promise.allSettled(sources.map((source) => fetchCalendarEvents(source.url)));

  return results
    .filter((result): result is PromiseFulfilledResult<ChurchEvent[]> => result.status === "fulfilled")
    .flatMap((result) => result.value)
    .sort((a, b) => a.date.localeCompare(b.date));
}
