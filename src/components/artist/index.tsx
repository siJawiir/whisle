"use client";

import { useQuery } from "@tanstack/react-query";
import ArtistDetail from "@/components/artist/ArtistDetail";
import { getSpotifyAccessToken } from "@/lib/axios";
import { getArtist, getArtistAlbums } from "@/lib/spotify";
import { notFound } from "next/navigation";

export default function ArtistPage({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["artist-full", id],
    queryFn: async () => {
      const token = await getSpotifyAccessToken();
      const [artist, albums] = await Promise.all([
        getArtist(token, id),
        getArtistAlbums(token, id, 8),
      ]);
      return { artist, albums };
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data?.artist) return notFound();

  return (
    <main className="container mx-auto py-8">
      <ArtistDetail artist={data.artist} albums={data.albums} />
    </main>
  );
}
