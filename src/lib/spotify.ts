import {
  SpotifyAlbum,
  SpotifyArtist,
  SpotifyPaginatedResponse,
  SpotifyTrack,
} from "@/@types/spotify";
import { AxiosError } from "axios";
import { spotifyApi } from "./api";

async function spotifyFetch<T>(url: string): Promise<T | null> {
  try {
    const { data } = await spotifyApi.get<T>(url);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        `Spotify API Error [${url}]:`,
        error.response?.data || error.message,
      );
    }
    return null;
  }
}

export async function getTopTracks(
  limit = 10,
  timeRange: "short_term" | "medium_term" | "long_term" = "medium_term",
): Promise<SpotifyTrack[]> {
  const data = await spotifyFetch<{ items: SpotifyTrack[] }>(
    `/me/top/tracks?limit=${limit}&time_range=${timeRange}`,
  );
  return data?.items || [];
}

export async function getTopArtists(
  limit = 5,
  timeRange: "short_term" | "medium_term" | "long_term" = "medium_term",
): Promise<SpotifyArtist[]> {
  const data = await spotifyFetch<{ items: SpotifyArtist[] }>(
    `/me/top/artists?limit=${limit}&time_range=${timeRange}`,
  );
  return data?.items || [];
}

export async function getArtist(
  artistId: string,
): Promise<SpotifyArtist | null> {
  return await spotifyFetch<SpotifyArtist>(`/artists/${artistId}`);
}

export async function getArtistAlbums(
  artistId: string,
  limit = 8,
): Promise<SpotifyAlbum[]> {
  const data = await spotifyFetch<SpotifyPaginatedResponse<SpotifyAlbum>>(
    `/artists/${artistId}/albums?limit=${limit}&include_groups=album,single`,
  );
  return data?.items || [];
}

export async function getRecentlyPlayed(limit = 10) {
  const data = await spotifyFetch<{ items: { track: SpotifyTrack }[] }>(
    `/me/player/recently-played?limit=${limit}`,
  );
  return data?.items.map((item) => item.track) || [];
}
