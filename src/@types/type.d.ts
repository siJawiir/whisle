import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: "RefreshAccessTokenError";
    user: {
      id?: string;
      product?: string;
    } & DefaultSession["user"];
  }

  interface User {
    product?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires: number;
    product?: string;
    error?: "RefreshAccessTokenError";
  }
}


