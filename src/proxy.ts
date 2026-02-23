import { NextRequest, NextResponse } from "next/server";
import {
  WHISLE_REDIRECT,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REFRESH_TOKEN,
} from "./lib/constants";
import { fetchSpotifyToken, setTokenCookies } from "./lib/spotify-auth";

export default async function proxy(request: NextRequest) {
  const { pathname, searchParams, origin } = request.nextUrl;
  const cookies = request.cookies;

  const code = searchParams.get("code");
  const authError = searchParams.get("error");
  const refreshToken = cookies.get(SPOTIFY_REFRESH_TOKEN)?.value;
  const redirectPath = cookies.get(WHISLE_REDIRECT)?.value || pathname;

  if (authError) {
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  if (code) {
    const data = await fetchSpotifyToken({
      code,
      redirect_uri: origin,
      grant_type: "authorization_code",
    });
    return setTokenCookies(
      NextResponse.redirect(new URL(redirectPath, request.url)),
      data,
    );
  }

  if (cookies.has(SPOTIFY_ACCESS_TOKEN)) {
    return NextResponse.next();
  }

  if (refreshToken) {
    const data = await fetchSpotifyToken({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });
    return setTokenCookies(NextResponse.next(), data);
  }

  const data = await fetchSpotifyToken({ grant_type: "client_credentials" });
  return setTokenCookies(NextResponse.next(), data);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
