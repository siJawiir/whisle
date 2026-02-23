/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { NowPlayingState, SpotifyNowPlayingResponse } from "@/@types/spotify";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  ExternalLink,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const defaultTrack: NowPlayingState = {
  isPlaying: false,
  title: "Not Playing",
  artist: "Whisle",
  albumImageUrl: "/maskable/maskable_icon_x512.png",
  songUrl: "https://open.spotify.com",
  progressMs: 0,
  durationMs: 0,
  volumePercent: 50,
  deviceId: "",
  deviceName: "",
  repeatState: "off",
  shuffleState: false,
};

export default function NowPlayingBar() {
  const { data: session } = useSession();
  const [track, setTrack] = useState<NowPlayingState>(defaultTrack);
  const [volume, setVolume] = useState<number[]>([50]);

  const fetchNowPlaying = useCallback(async () => {
    if (!session?.accessToken) return;
    try {
      const res = await fetch(`https://api.spotify.com/v1/me/player`, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });

      if (res.status === 204 || res.status > 400) {
        setTrack(defaultTrack);
        return;
      }

      const data: SpotifyNowPlayingResponse = await res.json();
      console.log("🚀 ~ NowPlayingBar ~ data:", data);
      if (!data.item) {
        setTrack(defaultTrack);
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
      console.error("Spotify Sync Error:", e);
      setTrack(defaultTrack);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    fetchNowPlaying();
    const syncInterval = setInterval(fetchNowPlaying, 10000);
    return () => clearInterval(syncInterval);
  }, [fetchNowPlaying]);

  useEffect(() => {
    const tick = setInterval(() => {
      if (track.isPlaying && track.progressMs < track.durationMs) {
        setTrack((prev) => ({ ...prev, progressMs: prev.progressMs + 1000 }));
      }
    }, 1000);
    return () => clearInterval(tick);
  }, [track.isPlaying, track.durationMs]);

  const handleAction = async (
    action: "play" | "pause" | "next" | "previous",
  ) => {
    if (!session?.accessToken || track.title === "Not Playing") return;

    if (action === "play") setTrack((p) => ({ ...p, isPlaying: true }));
    if (action === "pause") setTrack((p) => ({ ...p, isPlaying: false }));

    try {
      const method =
        action === "next" || action === "previous" ? "POST" : "PUT";
      const endpoint =
        action === "play" ? "play" : action === "pause" ? "pause" : action;

      await fetch(`https://api.spotify.com/v1/me/player/${endpoint}`, {
        method,
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });

      setTimeout(fetchNowPlaying, 500);
    } catch (err) {
      console.error(`Action ${action} failed:`, err);
    }
  };

  const handleVolumeChange = async (newVolume: number[]) => {
    setVolume(newVolume);
    if (!session?.accessToken) return;
    try {
      await fetch(
        `https://api.spotify.com/v1/me/player/volume?volume_percent=${newVolume[0]}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${session.accessToken}` },
        },
      );
    } catch (err) {
      console.error("Volume failed:", err);
    }
  };

  const formatTime = (ms: number) => {
    if (!ms || ms < 0) return "0:00";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercentage =
    track.durationMs > 0 ? (track.progressMs / track.durationMs) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50 flex justify-center group/main">
      <Card className="w-full max-w-5xl bg-zinc-950/90 backdrop-blur-xl border-zinc-800 shadow-2xl px-6 py-3 transition-all duration-500 hover:border-sky-500/30">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-[30%] min-w-0">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md shadow-lg group-hover/main:scale-105 transition-transform bg-zinc-800">
              {track.albumImageUrl && (
                <Image
                  src={track.albumImageUrl}
                  alt={track.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate hover:underline cursor-pointer">
                {track.title}
              </p>
              <p className="text-xs text-zinc-400 truncate">{track.artist}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
            <div className="flex items-center gap-5">
              <button className="text-zinc-500 hover:text-sky-500 transition">
                <Shuffle size={16} />
              </button>
              <button
                onClick={() => handleAction("previous")}
                className="text-zinc-400 hover:text-white transition"
              >
                <SkipBack size={20} fill="currentColor" />
              </button>
              <button
                onClick={() => handleAction(track.isPlaying ? "pause" : "play")}
                className="bg-white p-2 rounded-full hover:scale-105 active:scale-95 transition-all text-black"
              >
                {track.isPlaying ? (
                  <Pause size={24} fill="black" />
                ) : (
                  <Play size={24} fill="black" className="ml-0.5" />
                )}
              </button>
              <button
                onClick={() => handleAction("next")}
                className="text-zinc-400 hover:text-white transition"
              >
                <SkipForward size={20} fill="currentColor" />
              </button>
              <button className="text-zinc-500 hover:text-sky-500 transition">
                <Repeat size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2 w-full text-[10px] font-mono text-zinc-500">
              <span className="w-8 text-right">
                {formatTime(track.progressMs)}
              </span>
              <Progress
                value={progressPercentage}
                className="h-1 bg-zinc-800 flex-1"
              />
              <span className="w-8">{formatTime(track.durationMs)}</span>
            </div>
          </div>

          <div className="flex justify-end items-center gap-4 w-[30%]">
            <div className="flex items-center gap-2 group w-32">
              {volume[0] === 0 ? (
                <VolumeX size={18} className="text-zinc-500" />
              ) : (
                <Volume2
                  size={18}
                  className="text-zinc-500 group-hover:text-white"
                />
              )}
              <Slider
                value={volume}
                max={100}
                onValueChange={handleVolumeChange}
                className="w-24 cursor-pointer"
              />
            </div>
            <a
              href={track.songUrl}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-sky-500 transition-all hover:scale-110"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
