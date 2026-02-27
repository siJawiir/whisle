import ArtistPage from "@/components/artist";
import { getArtist } from "@/lib/spotify";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const artist = await getArtist(id);
  if (!artist) return { title: "Artist Not Found" };
  return { title: `${artist.name} | Spotify Discovery` };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <ArtistPage id={id} />;
}
