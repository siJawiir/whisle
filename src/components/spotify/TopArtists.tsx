import { SpotifyArtist } from "@/@types/spotify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play } from "lucide-react";

export default function TopArtists({ artists }: { artists: SpotifyArtist[] }) {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-4">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="group relative flex flex-col gap-4 p-4 rounded-xl bg-transparent hover:bg-zinc-900/60 transition-all duration-300 cursor-pointer min-w-45 max-w-45"
          >
            <div className="relative aspect-square w-full shadow-2xl">
              <Avatar className="h-full w-full border-none shadow-lg">
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
                <div className="bg-sky-500/95 text-black p-3 rounded-full shadow-xl shadow-black/50 hover:scale-105 active:scale-95 transition-transform">
                  <Play size={20} fill="currentColor" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-base font-bold text-white truncate">
                {artist.name}
              </p>
              <p className="text-sm font-medium text-zinc-400 capitalize">
                Artist
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
