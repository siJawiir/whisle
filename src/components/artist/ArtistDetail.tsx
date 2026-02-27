import { SpotifyAlbum, SpotifyArtist } from "@/@types/spotify";
import Image from "next/image";
import { AlbumCard } from "../album/AlbumCard";
import ArtistPick from "./ArtistPick";

interface ArtistDetailProps {
  artist: SpotifyArtist;
  albums: SpotifyAlbum[];
}

export default function ArtistDetail({ artist, albums }: ArtistDetailProps) {
  const latestRelease = albums[0];

  return (
    <div className="flex flex-col w-full pb-20 bg-zinc-950 text-white  selection:bg-sky-500/30">
      <header className="relative flex items-end p-6 md:p-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-3xl opacity-80"
          style={{ backgroundImage: `url(${artist.images[0]?.url})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        <div className="relative flex flex-col md:flex-row items-center md:items-end gap-8 z-10 w-full">
          <div className="relative h-48 w-48 md:h-64 md:w-64 shrink-0 shadow-2xl">
            <Image
              src={artist.images[0]?.url}
              alt={artist.name}
              fill
              className="object-cover rounded-full border-4 border-white/10"
              priority
            />
          </div>
          <div className="flex flex-col text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                Artist
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4">
              {artist.name}
            </h1>
          </div>
        </div>
      </header>

      <main className="px-6 md:px-12 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 h-fit lg:sticky lg:top-32">
          {latestRelease && (
            <ArtistPick album={latestRelease} artist={artist} />
          )}
        </aside>

        <section className="lg:col-span-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Discography</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
