import { refreshAccessToken } from "@/lib/spotify-auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const SPOTIFY_AUTHORIZATION_URL = new URL(
  process.env.SPOTIFY_AUTHORIZATION_URL!,
);

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-follow-read",
  "user-follow-modify",
  "user-library-read",
  "user-library-modify",
  "user-read-recently-played",
  "streaming",
  "user-read-private",
].join(" ");

SPOTIFY_AUTHORIZATION_URL.searchParams.append("scope", scopes);

export const authConfig: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: SPOTIFY_AUTHORIZATION_URL.toString(),
      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0]?.url,
          product: profile.product, 
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: (account.expires_at ?? 0) * 1000,
          product: user.product,
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

      if (session.user) {
        session.user.product = token.product;
        session.user.id = token.sub; 
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
