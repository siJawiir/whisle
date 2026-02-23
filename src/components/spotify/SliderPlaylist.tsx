"use client";

import { UniversalCardData } from "@/@types/spotify";
import { CardTrack } from "./CardTrack";

interface SliderPlaylistProps {
  id: string;
  title?: string;
  data: UniversalCardData[];
}

export default function SliderPlaylist({
  id,
  title,
  data,
}: SliderPlaylistProps) {
  if (!data || data.length === 0) return null;

  return (
    <section id={id} className="flex flex-col gap-4">
      {title && (
        <div className="px-8 flex items-center justify-between text-2xl font-bold">
          {title}
        </div>
      )}
      <div className="relative">
        <div
          className="flex overflow-x-auto gap-2 px-8 pb-4 no-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {data.map((item) => (
            <CardTrack key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
