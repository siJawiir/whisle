import Image from "next/image";
import { Play } from "lucide-react";
import { SpotifyAlbum } from "@/@types/spotify";

export const AlbumCard = ({ album }: { album: SpotifyAlbum }) => {
  const releaseYear = new Date(album.release_date).getFullYear();

  return (
    <div className="group bg-zinc-900/40 p-4 rounded-xl border border-transparent hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer shadow-md">
      <div className="relative aspect-square mb-4 rounded-lg overflow-hidden shadow-lg shadow-black/50">
        <Image
          src={album.images[0]?.url}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          alt={album.name}
        />

        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-300">
          <div className="absolute bottom-2 right-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            <div className="bg-sky-500 p-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform">
              <Play size={20} fill="black" className="text-black ml-0.5" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="text-sm md:text-base font-bold text-white truncate group-hover:text-sky-400 transition-colors duration-300">
          {album.name}
        </h4>
        <p className="text-sm md:text-xs text-zinc-400 font-bold capitalize ">
          {releaseYear} • {album.type}
        </p>
      </div>
    </div>
  );
};
