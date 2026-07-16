import "server-only";
import { sermonPlaylist } from "@/lib/sermons";

interface PlaylistItemsResponse {
  items?: Array<{
    contentDetails?: { videoId?: string; videoPublishedAt?: string };
    snippet?: { title?: string };
  }>;
}

interface VideosResponse {
  items?: Array<{
    id: string;
    snippet?: {
      liveBroadcastContent?: "live" | "none" | "upcoming";
      publishedAt?: string;
      title?: string;
    };
    liveStreamingDetails?: { actualStartTime?: string; actualEndTime?: string };
  }>;
}

export interface ActiveYouTubeStream {
  embedUrl: string;
  publishedAt?: string;
  title: string;
  videoId: string;
  watchUrl: string;
}

export interface YouTubeSermon {
  embedUrl: string;
  publishedAt?: string;
  title: string;
  videoId: string;
  watchUrl: string;
}

export async function getYouTubePlaylistSermons(): Promise<YouTubeSermon[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return [];

  try {
    const playlistParams = new URLSearchParams({
      part: "contentDetails,snippet",
      playlistId: sermonPlaylist.playlistId,
      maxResults: "50",
      key: apiKey,
    });
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?${playlistParams}`,
      { next: { revalidate: 60 } },
    );
    if (!response.ok) return [];

    const data = (await response.json()) as PlaylistItemsResponse;
    return (
      data.items
        ?.map<YouTubeSermon | null>((item) => {
          const videoId = item.contentDetails?.videoId;
          const title = item.snippet?.title;
          if (!videoId || !title || title === "Private video" || title === "Deleted video") {
            return null;
          }
          return {
            videoId,
            title,
            publishedAt: item.contentDetails?.videoPublishedAt,
            embedUrl: `https://www.youtube.com/embed/${videoId}`,
            watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
          };
        })
        .filter((sermon): sermon is YouTubeSermon => sermon !== null)
        .slice(0, 4) ?? []
    );
  } catch {
    return [];
  }
}

export async function getActiveYouTubeStream(): Promise<ActiveYouTubeStream | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  try {
    const playlistIds = [
      sermonPlaylist.playlistId,
      sermonPlaylist.channelUploadsPlaylistId,
    ];
    const playlistResponses = await Promise.all(
      playlistIds.map((playlistId) => {
        const params = new URLSearchParams({
          part: "contentDetails",
          playlistId,
          maxResults: "50",
          key: apiKey,
        });
        return fetch(`https://www.googleapis.com/youtube/v3/playlistItems?${params}`, {
          next: { revalidate: 60 },
        });
      }),
    );
    const playlistData = await Promise.all(
      playlistResponses.filter((response) => response.ok).map(
        (response) => response.json() as Promise<PlaylistItemsResponse>,
      ),
    );
    const videoIds = [
      ...new Set(
        playlistData.flatMap(
          (data) =>
            data.items
              ?.map((item) => item.contentDetails?.videoId)
              .filter((videoId): videoId is string => Boolean(videoId)) ?? [],
        ),
      ),
    ];
    if (videoIds.length === 0) return null;

    const videosParams = new URLSearchParams({
      part: "snippet,liveStreamingDetails",
      id: videoIds.join(","),
      key: apiKey,
    });
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?${videosParams}`,
      { next: { revalidate: 60 } },
    );
    if (!videosResponse.ok) return null;

    const videosData = (await videosResponse.json()) as VideosResponse;
    const activeVideo = videosData.items?.find(
      (video) =>
        video.snippet?.liveBroadcastContent === "live" ||
        Boolean(
          video.liveStreamingDetails?.actualStartTime &&
            !video.liveStreamingDetails?.actualEndTime,
        ),
    );
    if (!activeVideo) return null;

    return {
      videoId: activeVideo.id,
      embedUrl: `https://www.youtube.com/embed/${activeVideo.id}`,
      publishedAt:
        activeVideo.liveStreamingDetails?.actualStartTime ?? activeVideo.snippet?.publishedAt,
      title: activeVideo.snippet?.title ?? "Watch Live",
      watchUrl: `https://www.youtube.com/watch?v=${activeVideo.id}`,
    };
  } catch {
    return null;
  }
}
