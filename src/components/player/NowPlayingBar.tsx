"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { useSpotifyPlayer } from "./hooks/useSpotifyPlayer";

const formatTime = (ms: number) => {
  if (!ms || ms < 0) return "0:00";
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

export default function NowPlayingBar() {
  const { track, volume, handleAction, handleVolumeChange } =
    useSpotifyPlayer();

  const progressPercentage =
    track.durationMs > 0 ? (track.progressMs / track.durationMs) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50 flex justify-center pointer-events-none">
      <Card className="pointer-events-auto w-full max-w-5xl bg-zinc-950/90 backdrop-blur-xl border-zinc-800 shadow-2xl px-6 py-3 transition-all duration-500 hover:border-sky-500/30">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-[30%] min-w-0">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md shadow-lg transition-transform group-hover/main:scale-105 bg-zinc-800">
              <Image
                src={track.albumImageUrl}
                alt={track.title}
                fill
                className="object-cover"
                unoptimized
              />
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
              <ControlBtn
                icon={<Shuffle size={16} />}
                className="text-zinc-500 hover:text-sky-500"
              />
              <ControlBtn
                icon={<SkipBack size={20} fill="currentColor" />}
                onClick={() => handleAction("previous")}
              />
              <Button
                onClick={() => handleAction(track.isPlaying ? "pause" : "play")}
                className="bg-white rounded-full h-10 w-10 p-0 hover:scale-105 active:scale-95 transition-all text-black"
              >
                {track.isPlaying ? (
                  <Pause size={24} fill="black" />
                ) : (
                  <Play size={24} fill="black" className="ml-0.5" />
                )}
              </Button>
              <ControlBtn
                icon={<SkipForward size={20} fill="currentColor" />}
                onClick={() => handleAction("next")}
              />
              <ControlBtn
                icon={<Repeat size={16} />}
                className="text-zinc-500 hover:text-sky-500"
              />
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

function ControlBtn({
  icon,
  onClick,
  className,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        "text-zinc-400 rounded-full hover:text-white hover:bg-transparent transition",
        className,
      )}
    >
      {icon}
    </Button>
  );
}
