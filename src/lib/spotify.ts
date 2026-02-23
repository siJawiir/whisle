import {
  FollowedArtistsResponse,
  SavedAlbumItem,
  SpotifyAlbum,
  SpotifyArtist,
  SpotifyPaginatedResponse,
  SpotifyPlaylist,
  SpotifyTrack,
} from "@/@types/spotify";
import { AxiosError, AxiosRequestConfig } from "axios";
import { JWT } from "next-auth/jwt";
import { createSpotifyAxiosInstance } from "./axios";
import { fetchSpotifyToken } from "./spotify-auth";

export interface SpotifyRequestConfig extends AxiosRequestConfig {
  fetchOptions?: {
    next?: {
      revalidate?: number | false;
      tags?: string[];
    };
    cache?: RequestCache;
  };
}
export async function refreshAccessToken(token: JWT): Promise<JWT> {
  const data = await fetchSpotifyToken({
    grant_type: "refresh_token",
    refresh_token: token.refreshToken as string,
  });

  if (!data || data.error) {
    return { ...token, error: "RefreshAccessTokenError" };
  }

  return {
    ...token,
    accessToken: data.access_token,
    accessTokenExpires: Date.now() + data.expires_in * 1000,
    refreshToken: data.refresh_token ?? token.refreshToken,
  };
}

export async function getTopTracks(
  accessToken: string,
): Promise<SpotifyTrack[]> {
  try {
    const api = await createSpotifyAxiosInstance(accessToken);
    const { data } = await api.get<{ items: SpotifyTrack[] }>(
      "/me/top/tracks?limit=10",
    );
    return data.items;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "getTopTracks Error:",
        error.response?.data || error.message,
      );
    }
    return [];
  }
}

export async function getTopArtists(
  accessToken: string,
): Promise<SpotifyArtist[]> {
  try {
    const api = await createSpotifyAxiosInstance(accessToken);
    const { data } = await api.get<{ items: SpotifyArtist[] }>(
      "/me/top/artists?limit=10",
    );
    return data.items;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "getTopArtists Error:",
        error.response?.data || error.message,
      );
    }
    return [];
  }
}

export async function getUserPlaylists(
  accessToken: string,
  limit = 10,
): Promise<SpotifyPlaylist[]> {
  try {
    const api = await createSpotifyAxiosInstance(accessToken);
    const { data } = await api.get<SpotifyPaginatedResponse<SpotifyPlaylist>>(
      `/me/playlists?limit=${limit}`,
    );
    return data.items;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "getUserPlaylists Error:",
        error.response?.data || error.message,
      );
    }
    return [];
  }
}

export async function getUserSavedAlbums(
  accessToken: string,
  limit = 10,
): Promise<SpotifyAlbum[]> {
  try {
    const api = await createSpotifyAxiosInstance(accessToken);
    const { data } = await api.get<SpotifyPaginatedResponse<SavedAlbumItem>>(
      `/me/albums?limit=${limit}`,
    );
    return data.items.map((item) => item.album);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "getUserSavedAlbums Error:",
        error.response?.data || error.message,
      );
    }
    return [];
  }
}

export async function getFollowedArtists(
  accessToken: string,
  limit = 10,
): Promise<SpotifyArtist[]> {
  try {
    const api = await createSpotifyAxiosInstance(accessToken);
    const { data } = await api.get<FollowedArtistsResponse>(
      `/me/following?type=artist&limit=${limit}`,
    );
    return data.artists.items;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "getFollowedArtists Error:",
        error.response?.data || error.message,
      );
    }
    return [];
  }
}
