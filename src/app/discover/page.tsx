import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authConfig } from "../api/auth/[...nextauth]/route";
import {
  getTopArtists,
  getTopTracks,
  getUserPlaylists,
  getUserSavedAlbums,
} from "@/lib/spotify";
import { SpotifyArtist, UniversalCardData } from "@/@types/spotify";

import SliderPlaylist from "@/components/spotify/SliderPlaylist";
import TopArtists from "@/components/spotify/TopArtists";

interface SectionConfig {
  id: string;
  title: string;
  data: UniversalCardData[];
  type: "track" | "artist" | "album" | "playlist";
}

export default async function DiscoverPage() {
  const session = await getServerSession(authConfig);

  if (!session?.accessToken) redirect("/");

  const [topTracks, topArtists, savedAlbums, myPlaylists] = await Promise.all([
    getTopTracks(session.accessToken),
    getTopArtists(session.accessToken),
    getUserSavedAlbums(session.accessToken),
    getUserPlaylists(session.accessToken),
  ]);

  const sections: SectionConfig[] = [
    {
      id: "top-tracks",
      title: "Top Tracks for You",
      data: topTracks as UniversalCardData[],
      type: "track",
    },
    {
      id: "top-artists",
      title: "Your Favorite Artists",
      data: topArtists as UniversalCardData[],
      type: "artist",
    },
    {
      id: "saved-albums",
      title: "Recently Saved Albums",
      data: savedAlbums as UniversalCardData[],
      type: "album",
    },
    {
      id: "my-playlists",
      title: "Your Playlists",
      data: myPlaylists as UniversalCardData[],
      type: "playlist",
    },
  ];

  return (
    <main className="min-h-screen pb-24">
      <div className="flex flex-col gap-10">
        {sections.map(({ id, title, data, type }) => {
          if (data.length === 0) return null;

          return (
            <section
              key={id}
              aria-labelledby={`header-${id}`}
              className="group/section"
            >
              <div className="px-8 flex items-end justify-between mb-4">
                <Link
                  href={`/section/${id}`}
                  className="hover:underline decoration-white underline-offset-4"
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
                  className="text-sm font-bold text-zinc-400 hover:text-white transition-colors duration-200"
                >
                  Show all
                </Link>
              </div>

              <div className="relative px-4 overflow-visible">
                {type === "artist" ? (
                  <div className="px-4">
                    <TopArtists artists={data as SpotifyArtist[]} />
                  </div>
                ) : (
                  <SliderPlaylist id={id} data={data} />
                )}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
