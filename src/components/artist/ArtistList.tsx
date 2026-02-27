import { SpotifyArtist } from "@/@types/spotify";
import { ArtistCard } from "./ArtistCard";

interface ArtistListProps {
  artists: SpotifyArtist[];
}

export default function ArtistList({ artists }: ArtistListProps) {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}
