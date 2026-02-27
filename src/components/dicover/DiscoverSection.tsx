"use client"; 

import Link from "next/link";
import { SpotifyArtist, UniversalCardData } from "@/@types/spotify";
import ArtistList from "@/components/artist/ArtistList";
import SliderPlaylist from "@/components/spotify/SliderPlaylist";

interface DiscoverSectionProps<T> {
  id: string;
  title: string;
  data: T[] | undefined;
  type: "track" | "artist" | "album" | "playlist";
}

export default function DiscoverSection<T extends { id: string }>({
  id,
  title,
  data,
  type,
}: DiscoverSectionProps<T>) {
  
  if (!data || data.length === 0) return null;

  return (
    <section className="group/section" aria-labelledby={`header-${id}`}>
      <div className="px-8 flex items-end justify-between mb-2">
        <Link
          href={`/section/${id}`}
          className="hover:underline underline-offset-4"
        >
          <h2
            id={`header-${id}`}
            className="text-[22px] font-bold text-white tracking-tight"
          >
            {title}
          </h2>
        </Link>
        <Link
          href={`/section/${id}`}
          className="text-sm font-bold text-zinc-400 hover:text-white transition-colors"
        >
          Show all
        </Link>
      </div>

      <div className="relative px-4">
        {type === "artist" ? (
          <div className="px-4">
            <ArtistList artists={data as unknown as SpotifyArtist[]} />
          </div>
        ) : (
          <SliderPlaylist
            id={id}
            data={data as unknown as UniversalCardData[]}
          />
        )}
      </div>
    </section>
  );
}