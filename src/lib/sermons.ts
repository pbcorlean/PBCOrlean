export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  summary?: string;
  videoUrl: string;
}

export interface LiveStream {
  embedUrl?: string;
  watchUrl?: string;
}

export const liveStream: LiveStream = {
  embedUrl: "https://www.youtube.com/embed/26WlPaU-3b4",
  watchUrl: "https://www.youtube.com/@pbcorlean/live",
};

// Add completed sermon recordings here. Example:
// {
//   id: "2026-07-12-sunday-worship",
//   title: "Sunday Worship",
//   speaker: "Pastor Name",
//   date: "2026-07-12",
//   summary: "A short description of the message.",
//   videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
// }
export const sermons: Sermon[] = [];
