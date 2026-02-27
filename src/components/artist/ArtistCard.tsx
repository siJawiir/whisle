import Link from "next/link";
import { Play } from "lucide-react";
import { SpotifyArtist } from "@/@types/spotify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ArtistCardProps {
  artist: SpotifyArtist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link
      href={`/artist/${artist.id}`}
      className="group relative flex flex-col gap-4 p-4 rounded-xl bg-transparent hover:bg-zinc-900/60 transition-all duration-300 min-w-45 max-w-45"
    >
      <div className="relative aspect-square w-full">
        <Avatar className="h-full w-full border-none shadow-2xl">
          <AvatarImage
            src={artist.images[0]?.url}
            alt={artist.name}
            className="object-cover"
          />
          <AvatarFallback className="bg-zinc-800 text-sky-400 font-bold text-xl">
            {artist.name[0]}
          </AvatarFallback>
        </Avatar>

        <div className="absolute bottom-2 right-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <div className="bg-sky-500 text-black p-3 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-transform">
            <Play size={20} fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-base font-bold text-white truncate">{artist.name}</p>
        <p className="text-sm font-medium text-zinc-400">Artist</p>
      </div>
    </Link>
  );
}
