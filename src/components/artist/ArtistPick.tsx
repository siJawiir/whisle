import Image from "next/image";
import { SpotifyAlbum, SpotifyArtist } from "@/@types/spotify";

interface ArtistPickProps {
  album: SpotifyAlbum;
  artist: SpotifyArtist;
}

export default function ArtistPick({ album, artist }: ArtistPickProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold tracking-tight text-white">
        Artist Pick
      </h2>

      <div className="group relative w-full aspect-video overflow-hidden rounded-xl bg-zinc-900 shadow-2xl">
        <div className="absolute inset-0">
          <Image
            src={artist.images[0]?.url}
            alt={artist.name}
            fill
            className="object-cover object-center opacity-70 transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
        </div>

        <div className="absolute top-4 left-4 z-20">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-xl">
            <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-zinc-200">
              <Image
                src={artist.images[artist.images.length - 1]?.url}
                alt={artist.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-[11px] font-bold text-zinc-900 leading-none pr-1">
              This song&apos;s for you to heal
            </p>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-4 pr-4">
          <div className="relative h-20 w-20 md:h-24 md:w-24 shrink-0 rounded-md overflow-hidden shadow-2xl">
            <Image
              src={album.images[0]?.url}
              alt={album.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <h3 className="text-lg md:text-2xl font-black text-white leading-tight truncate drop-shadow-md group-hover:text-sky-400 transition-colors">
              {album.name}
            </h3>
            <p className="text-xs md:text-sm font-bold text-zinc-300 uppercase tracking-widest">
              {album.type}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
