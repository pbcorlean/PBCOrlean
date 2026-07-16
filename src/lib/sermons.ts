export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  summary?: string;
  videoUrl: string;
}

export interface LiveStream {
  channelHandle: string;
  watchUrl: string;
}

export interface SermonPlaylist {
  embedUrl: string;
  watchUrl: string;
}

export const liveStream: LiveStream = {
  channelHandle: "pbcorlean",
  watchUrl: "https://www.youtube.com/@pbcorlean/live",
};

export const sermonPlaylist: SermonPlaylist = {
  embedUrl: "https://www.youtube.com/embed/videoseries?list=PLCIya7u0546I",
  watchUrl: "https://www.youtube.com/playlist?list=PLCIya7u0546I",
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
