export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  summary: string;
  videoUrl?: string;
}

// TODO: replace with the church's real sermon archive, or wire up to a CMS/YouTube feed
export const sermons: Sermon[] = [
  {
    id: "1",
    title: "Walking in Faith",
    speaker: "Pastor Name",
    date: "2026-06-07",
    summary: "A look at what it means to trust God through life's uncertainties.",
  },
  {
    id: "2",
    title: "The Power of Prayer",
    speaker: "Pastor Name",
    date: "2026-05-03",
    summary: "Exploring how prayer shapes our relationship with God and one another.",
  },
  {
    id: "3",
    title: "Living in Community",
    speaker: "Pastor Name",
    date: "2026-04-05",
    summary: "Why fellowship and service to others are central to the Christian life.",
  },
];
