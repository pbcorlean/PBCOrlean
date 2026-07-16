export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  summary?: string;
  videoUrl: string;
}

export interface SermonPlaylist {
  channelUploadsPlaylistId: string;
  embedUrl: string;
  playlistId: string;
  watchUrl: string;
}

export const sermonPlaylist: SermonPlaylist = {
  channelUploadsPlaylistId: "UUdn1DbwW3vafQ7lf3cMG0jw",
  embedUrl: "https://www.youtube.com/embed/videoseries?list=PLUv5wXnQef_4",
  playlistId: "PLUv5wXnQef_4",
  watchUrl: "https://www.youtube.com/playlist?list=PLUv5wXnQef_4",
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
