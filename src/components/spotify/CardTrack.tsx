import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { UniversalCardData } from "@/@types/spotify";

function hasArtists(
  item: UniversalCardData,
): item is UniversalCardData & { artists: { id: string; name: string }[] } {
  return "artists" in item;
}

function hasOwner(
  item: UniversalCardData,
): item is UniversalCardData & { owner: { id: string; display_name: string } } {
  return "owner" in item;
}

function hasDescription(
  item: UniversalCardData,
): item is UniversalCardData & { description: string } {
  return "description" in item;
}

export const CardTrack = ({ item }: { item: UniversalCardData }) => {
  const type = (item as { type?: string }).type || "track";
  const mainHref = `/${type}/${item.id}`;

  const imageUrl =
    "album" in item && item.album.images?.[0]?.url
      ? item.album.images[0].url
      : "images" in item && item.images?.[0]?.url
        ? item.images[0].url
        : "/maskable/maskable_icon_x384.png";

  const renderSubtitle = () => {
    if (hasDescription(item) && item.description) {
      return (
        <span className="line-clamp-2">
          {item.description.replace(/<[^>]*>?/gm, "")}
        </span>
      );
    }

    if (hasArtists(item)) {
      return (
        <span className="line-clamp-1">
          {item.artists.map((artist, index) => (
            <React.Fragment key={artist.id}>
              <Link
                href={`/artist/${artist.id}`}
                className="hover:underline hover:text-white transition-colors relative z-20"
                onClick={(e) => e.stopPropagation()}
              >
                {artist.name}
              </Link>
              {index < item.artists.length - 1 && ", "}
            </React.Fragment>
          ))}
        </span>
      );
    }

    if (hasOwner(item)) {
      return (
        <Link
          href={`/user/${item.owner.id}`}
          className="hover:underline hover:text-white relative z-20"
          onClick={(e) => e.stopPropagation()}
        >
          By {item.owner.display_name}
        </Link>
      );
    }

    return null;
  };

  return (
    <div
      className="group relative min-w-40 md:min-w-50 p-4 rounded-xl hover:bg-zinc-800/60 transition-all duration-300"
      style={{ scrollSnapAlign: "start" }}
    >
      <Link
        href={mainHref}
        className="absolute inset-0 z-10"
        aria-label={item.name}
      />

      <div className="relative aspect-square mb-4 overflow-hidden rounded-md shadow-lg">
        <Image
          src={imageUrl}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 160px, 200px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute bottom-2 right-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-20">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-black shadow-xl hover:scale-105 active:scale-95 transition-transform"
            aria-label="Play"
          >
            <Play fill="black" size={24} className="ml-1" />
          </button>
        </div>
      </div>

      <div className="space-y-1 relative z-20">
        <h3 className="truncate font-bold text-sm text-white hover:underline cursor-pointer">
          {item.name}
        </h3>
        <div className="text-xs text-zinc-500 leading-relaxed">
          {renderSubtitle()}
        </div>
      </div>
    </div>
  );
};
