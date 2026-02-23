import Axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";
import { SPOTIFY_ACCESS_TOKEN } from "./constants";
import { fetchSpotifyToken } from "./spotify-auth";

export async function getSpotifyAccessToken(): Promise<string> {
  const cookiesStore = await cookies();
  const cachedToken = cookiesStore.get(SPOTIFY_ACCESS_TOKEN)?.value;

  if (cachedToken) return cachedToken;

  const data = await fetchSpotifyToken({ grant_type: "client_credentials" });
  if (!data?.access_token) throw new Error("Spotify Auth Failed");

  return data.access_token;
}

export async function createSpotifyAxiosInstance(
  customToken?: string,
): Promise<AxiosInstance> {
  const token = customToken ?? (await getSpotifyAccessToken());

  return Axios.create({
    baseURL: process.env.SPOTIFY_API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    timeout: 10000,
  });
}
