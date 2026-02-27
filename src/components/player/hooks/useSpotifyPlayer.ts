/* eslint-disable react-hooks/set-state-in-effect */
import { NowPlayingState, SpotifyNowPlayingResponse } from "@/@types/spotify";
import { spotifyApi } from "@/lib/api";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

const DEFAULT_TRACK: NowPlayingState = {
  isPlaying: false,
  title: "Not Playing",
  artist: "Whisle",
  albumImageUrl: "/maskable/maskable_icon_x512.png",
  songUrl: "#",
  progressMs: 0,
  durationMs: 0,
  volumePercent: 50,
  deviceId: "",
  deviceName: "",
  repeatState: "off",
  shuffleState: false,
};

export function useSpotifyPlayer() {
  const { data: session } = useSession();
  const [track, setTrack] = useState<NowPlayingState>(DEFAULT_TRACK);
  const [volume, setVolume] = useState<number[]>([50]);

  const fetchNowPlaying = useCallback(async () => {
    if (!session?.accessToken) return;
    try {
      const { data, status } =
        await spotifyApi.get<SpotifyNowPlayingResponse>("/me/player");

      if (status === 204 || !data.item) {
        setTrack(DEFAULT_TRACK);
        return;
      }

      setTrack({
        isPlaying: data.is_playing,
        title: data.item.name,
        artist: data.item.artists.map((a) => a.name).join(", "),
        albumImageUrl: data.item.album.images[0]?.url || "",
        songUrl: data.item.external_urls.spotify,
        progressMs: data.progress_ms,
        durationMs: data.item.duration_ms,
        volumePercent: data.device?.volume_percent ?? 50,
        deviceId: data.device.id,
        deviceName: data.device.name,
        repeatState: data.repeat_state,
        shuffleState: data.shuffle_state,
      });
      setVolume([data.device?.volume_percent ?? 50]);
    } catch (e) {
      console.log("🚀 ~ useSpotifyPlayer ~ e:", e);
      setTrack(DEFAULT_TRACK);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  useEffect(() => {
    if (!track.isPlaying) return;
    const tick = setInterval(() => {
      setTrack((prev) => {
        if (prev.progressMs >= prev.durationMs) return prev;
        return { ...prev, progressMs: prev.progressMs + 1000 };
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [track.isPlaying, track.durationMs]);

  const handleAction = async (
    action: "play" | "pause" | "next" | "previous",
  ) => {
    if (!session?.accessToken || track.title === "Not Playing") return;

    // Optimistic Update
    if (action === "play") setTrack((p) => ({ ...p, isPlaying: true }));
    if (action === "pause") setTrack((p) => ({ ...p, isPlaying: false }));

    try {
      const endpoint = `/me/player/${action}`;
      if (action === "next" || action === "previous") {
        await spotifyApi.post(endpoint);
      } else {
        await spotifyApi.put(endpoint);
      }
      setTimeout(fetchNowPlaying, 500);
    } catch (err) {
      console.log("🚀 ~ handleAction ~ err:", err);
      console.error(`Action ${action} failed`);
    }
  };

  const handleVolumeChange = async (newVol: number[]) => {
    setVolume(newVol);
    try {
      await spotifyApi.put(`/me/player/volume?volume_percent=${newVol[0]}`);
    } catch (err) {
      console.log("🚀 ~ handleVolumeChange ~ err:", err);
      /* silent */
    }
  };

  return { track, volume, handleAction, handleVolumeChange };
}
