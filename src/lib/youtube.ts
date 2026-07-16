import "server-only";
import { liveStream } from "@/lib/sermons";

interface ChannelResponse {
  items?: Array<{ id: string }>;
}

interface LiveSearchResponse {
  items?: Array<{ id?: { videoId?: string } }>;
}

export interface ActiveYouTubeStream {
  embedUrl: string;
  videoId: string;
  watchUrl: string;
}

export async function getActiveYouTubeStream(): Promise<ActiveYouTubeStream | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  try {
    const channelParams = new URLSearchParams({
      part: "id",
      forHandle: liveStream.channelHandle,
      key: apiKey,
    });
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?${channelParams}`,
      { next: { revalidate: 3600 } },
    );
    if (!channelResponse.ok) return null;

    const channelData = (await channelResponse.json()) as ChannelResponse;
    const channelId = channelData.items?.[0]?.id;
    if (!channelId) return null;

    const liveParams = new URLSearchParams({
      part: "snippet",
      channelId,
      eventType: "live",
      type: "video",
      maxResults: "1",
      key: apiKey,
    });
    const liveResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${liveParams}`,
      { next: { revalidate: 60 } },
    );
    if (!liveResponse.ok) return null;

    const liveData = (await liveResponse.json()) as LiveSearchResponse;
    const videoId = liveData.items?.[0]?.id?.videoId;
    if (!videoId) return null;

    return {
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
    };
  } catch {
    return null;
  }
}
