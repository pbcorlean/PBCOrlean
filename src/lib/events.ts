import ical from "node-ical";
import { formatInTimeZone, fromZonedTime, toZonedTime } from "date-fns-tz";
import { CHURCH_TIME_ZONE } from "@/lib/timezone";

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
const RANGE_DAYS_BEHIND = 365;

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

// Recurring events from this Outlook feed advance in fixed UTC increments,
// which drifts the displayed local time by an hour whenever a DST change
// falls between the original event and a later occurrence (e.g. a 7:00 PM
// Eastern service would show as 6:00 PM once the clocks fall back). This
// re-anchors each occurrence to the same Eastern wall-clock time as the
// original event, on that occurrence's calendar day.
function alignToWallClock(occurrence: Date, wallClockSource: Date): Date {
  const zonedOccurrence = toZonedTime(occurrence, CHURCH_TIME_ZONE);
  const zonedWallClock = toZonedTime(wallClockSource, CHURCH_TIME_ZONE);
  const combined = new Date(
    zonedOccurrence.getFullYear(),
    zonedOccurrence.getMonth(),
    zonedOccurrence.getDate(),
    zonedWallClock.getHours(),
    zonedWallClock.getMinutes(),
    zonedWallClock.getSeconds(),
  );
  return fromZonedTime(combined, CHURCH_TIME_ZONE);
}

function formatTime(date: Date) {
  return formatInTimeZone(date, CHURCH_TIME_ZONE, "h:mm a");
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
    date: formatInTimeZone(start, CHURCH_TIME_ZONE, "yyyy-MM-dd"),
    time,
    description: (description ?? "").replace(/<[^>]*>/g, "").trim(),
  };
}

async function fetchCalendarEvents(url: string): Promise<ChurchEvent[]> {
  const data = await ical.async.fromURL(url);
  const now = new Date();
  const rangeStart = new Date(now.getTime() - RANGE_DAYS_BEHIND * 24 * 60 * 60 * 1000);
  const rangeEnd = new Date(now.getTime() + RANGE_DAYS_AHEAD * 24 * 60 * 60 * 1000);
  const events: ChurchEvent[] = [];

  for (const component of Object.values(data)) {
    if (!component || component.type !== "VEVENT" || !component.start) continue;

    const allDay = component.datetype === "date";

    if (component.rrule) {
      const occurrences = component.rrule.between(rangeStart, rangeEnd, true);

      for (const occurrence of occurrences) {
        const dateKey = occurrence.toISOString().slice(0, 10);
        if (component.exdate?.[dateKey]) continue;

        const recurrence = component.recurrences?.[dateKey];
        const start = recurrence?.start ?? (allDay ? occurrence : alignToWallClock(occurrence, component.start));
        const end =
          recurrence?.end ??
          (allDay
            ? occurrence
            : component.end
              ? alignToWallClock(occurrence, component.end)
              : start);

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
    } else if (component.start >= rangeStart && component.start <= rangeEnd) {
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
