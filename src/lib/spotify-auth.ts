import { JWT } from "next-auth/jwt";
import {
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REFRESH_TOKEN,
  WHISLE_REDIRECT,
} from "./constants";
import { NextResponse } from "next/server";

export interface SpotifyAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  error?: string;
}

export async function fetchSpotifyToken(
  bodyParams: Record<string, string>,
): Promise<SpotifyAuthResponse | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const authUrl = process.env.SPOTIFY_AUTH_URL;

  if (!clientId || !clientSecret || !authUrl) {
    console.error("Missing Spotify Environment Variables");
    return null;
  }

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  try {
    const res = await fetch(authUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(bodyParams).toString(),
      cache: "no-store",
    });

    return (await res.json()) as SpotifyAuthResponse;
  } catch (error) {
    console.error("Spotify Auth Fetch Error:", error);
    return null;
  }
}

export function setTokenCookies(
  response: NextResponse,
  data: SpotifyAuthResponse | null,
): NextResponse {
  if (!data || data.error) return response;

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
  };

  if (data.access_token) {
    response.cookies.set(SPOTIFY_ACCESS_TOKEN, data.access_token, {
      ...cookieOptions,
      maxAge: data.expires_in,
    });
  }

  if (data.refresh_token) {
    response.cookies.set(SPOTIFY_REFRESH_TOKEN, data.refresh_token, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 30 * 12,
    });
  }

  response.cookies.delete(WHISLE_REDIRECT);
  return response;
}

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  const data = await fetchSpotifyToken({
    grant_type: "refresh_token",
    refresh_token: token.refreshToken as string,
  });

  if (!data || data.error) {
    console.error("Failed to refresh Spotify token:", data?.error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
  return {
    ...token,
    accessToken: data.access_token,
    accessTokenExpires: Date.now() + data.expires_in * 1000,
    refreshToken: data.refresh_token ?? token.refreshToken,
  };
}
