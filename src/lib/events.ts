export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
}

// TODO: replace with the church's real upcoming events
export const events: ChurchEvent[] = [
  {
    id: "1",
    title: "Vacation Bible School",
    date: "2026-07-20",
    time: "9:00 AM - 12:00 PM",
    description: "A week of fun, music, and Bible lessons for kids of all ages.",
  },
  {
    id: "2",
    title: "Community Potluck",
    date: "2026-08-02",
    time: "12:00 PM",
    description: "Join us after Sunday Service for food and fellowship.",
  },
  {
    id: "3",
    title: "Fall Revival",
    date: "2026-09-14",
    time: "7:00 PM",
    description: "A week of renewal and worship with a special guest speaker.",
  },
];
