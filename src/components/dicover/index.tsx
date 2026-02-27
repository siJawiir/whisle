"use client";

import DiscoverSection from "@/components/dicover/DiscoverSection";
import Skeleton from "@/components/loader/Skeleton";
import { getRecentlyPlayed, getTopTracks } from "@/lib/spotify";
import { useQuery } from "@tanstack/react-query";


export default function DiscoverPage() {
  const { data: tracks, isLoading: loadingTracks } = useQuery({
    queryKey: ["top-tracks"],
    queryFn: () => getTopTracks(),
  });
  const { data: recentTracks, isLoading: loadingRecent } = useQuery({
    queryKey: ["recent-tracks"],
    queryFn: () => getRecentlyPlayed(),
  });

  return (
    <div className="min-h-screen pb-24 mt-20">
      <div className="flex flex-col gap-4">
        {loadingTracks ? (
          <Skeleton />
        ) : (
          <DiscoverSection
            id="top-tracks"
            title="Top Tracks for You"
            type="track"
            data={tracks}
          />
        )}

        <section>
          {loadingRecent ? (
            <Skeleton />
          ) : (
            <DiscoverSection
              id="recent-tracks"
              title="Recently Played"
              type="track"
              data={recentTracks || []}
            />
          )}
        </section>
      </div>
    </div>
  );
}
