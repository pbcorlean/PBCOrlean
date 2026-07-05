"use client";

import { useMemo, useState } from "react";
import type { ChurchEvent } from "@/lib/events";
import { CHURCH_TIME_ZONE } from "@/lib/timezone";
import { Card } from "@/components/Card";

interface EventCalendarProps {
  events: ChurchEvent[];
}

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const isoDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: CHURCH_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function todayDateString(): string {
  return isoDateFormatter.format(new Date());
}

function monthLabel(year: number, month: number) {
  return new Date(year, month, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function dayLabel(dateString: string) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function EventCalendar({ events }: EventCalendarProps) {
  const today = todayDateString();
  const [todayYear, todayMonth] = today.split("-").map(Number);
  const [currentYear, setCurrentYear] = useState(todayYear);
  const [currentMonth, setCurrentMonth] = useState(todayMonth - 1);
  const [selectedDate, setSelectedDate] = useState<string | null>(today);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, ChurchEvent[]>();
    for (const event of events) {
      const existing = map.get(event.date);
      if (existing) {
        existing.push(event);
      } else {
        map.set(event.date, [event]);
      }
    }
    return map;
  }, [events]);

  const cells = useMemo(() => {
    const firstOfMonth = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const leadingBlanks = firstOfMonth.getDay();
    const totalCells = Math.ceil((leadingBlanks + daysInMonth) / 7) * 7;

    return Array.from({ length: totalCells }, (_, index) => {
      const dayNumber = index - leadingBlanks + 1;
      if (dayNumber < 1 || dayNumber > daysInMonth) return null;
      const monthStr = String(currentMonth + 1).padStart(2, "0");
      const dayStr = String(dayNumber).padStart(2, "0");
      return `${currentYear}-${monthStr}-${dayStr}`;
    });
  }, [currentYear, currentMonth]);

  function goToMonth(offset: number) {
    const next = new Date(currentYear, currentMonth + offset, 1);
    setCurrentYear(next.getFullYear());
    setCurrentMonth(next.getMonth());
    setSelectedDate(null);
  }

  function goToToday() {
    setCurrentYear(todayYear);
    setCurrentMonth(todayMonth - 1);
    setSelectedDate(today);
  }

  const selectedEvents = selectedDate ? (eventsByDate.get(selectedDate) ?? []) : [];

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => goToMonth(-1)}
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-zinc-600 transition-colors hover:bg-zinc-50"
        >
          &lsaquo;
        </button>
        <div className="flex items-center gap-3">
          <p className="text-lg font-semibold text-zinc-900">{monthLabel(currentYear, currentMonth)}</p>
          <button
            type="button"
            onClick={goToToday}
            className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-zinc-600 transition-colors hover:bg-zinc-50"
          >
            Today
          </button>
        </div>
        <button
          type="button"
          onClick={() => goToMonth(1)}
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-zinc-600 transition-colors hover:bg-zinc-50"
        >
          &rsaquo;
        </button>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="py-2">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((dateString, index) => {
          if (!dateString) return <div key={`blank-${index}`} />;

          const dayEvents = eventsByDate.get(dateString) ?? [];
          const isToday = dateString === today;
          const isSelected = dateString === selectedDate;
          const dayNumber = Number(dateString.slice(-2));

          return (
            <button
              key={dateString}
              type="button"
              onClick={() => setSelectedDate(dateString)}
              className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border text-sm transition-colors ${
                isSelected
                  ? "border-primary bg-primary/10 font-semibold text-zinc-900"
                  : isToday
                    ? "border-primary/50 text-zinc-900"
                    : "border-transparent text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              <span>{dayNumber}</span>
              {dayEvents.length > 0 && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        {!selectedDate ? (
          <p className="text-sm text-zinc-600">Select a day to see its events.</p>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">{dayLabel(selectedDate)}</p>
            {selectedEvents.length === 0 ? (
              <p className="mt-3 text-sm text-zinc-600">No events on this day.</p>
            ) : (
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {selectedEvents.map((event) => (
                  <Card key={event.id}>
                    <p className="text-lg font-semibold text-zinc-900">{event.title}</p>
                    <p className="mt-1 text-sm text-zinc-500">{event.time}</p>
                    {event.description && <p className="mt-3 text-sm text-zinc-600">{event.description}</p>}
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
