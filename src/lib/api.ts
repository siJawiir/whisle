import Axios from "axios";
import { getSession } from "next-auth/react";

export const spotifyApi = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

spotifyApi.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});
