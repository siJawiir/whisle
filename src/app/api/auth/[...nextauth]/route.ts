import { refreshAccessToken } from "@/lib/spotify";
import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const SPOTIFY_AUTHORIZATION_URL = new URL(
  process.env.SPOTIFY_AUTHORIZATION_URL!,
);

const params = {
  scope: [
    "user-read-email",
    "playlist-read-private",
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-follow-read",
    "user-library-read",
    "user-library-modify",
    "user-read-recently-played",
    "streaming", 
    "user-read-private",
  ].join(" "), 
};

SPOTIFY_AUTHORIZATION_URL.search = new URLSearchParams(params).toString();

export const authConfig: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: SPOTIFY_AUTHORIZATION_URL.toString(),
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at! * 1000,
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.image,
        };
      }

      if (Date.now() < token.accessTokenExpires - 10000) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
