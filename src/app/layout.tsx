import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Providers from "@/components/layout/Providers";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import NowPlayingBar from "@/components/player/NowPlayingBar";
import { PremiumAlert } from "@/components/modal/PremiumAlert";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s - ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    images: {
      url: "/maskable/maskable_icon_x512.png",
      width: 512,
      height: 512,
    },
  },
  robots: {
    index: false,
    follow: false,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-white antialiased">
        <Providers>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
              <Navbar />

              <main className="flex-1 overflow-y-auto relative">
                <div className="absolute inset-0 bg-linear-to-b from-sky-900/20 via-transparent to-transparent -z-10" />
                <div>{children}</div>
                <div className="mt-20"></div>
              </main>
            </div>
          </div>

          <NowPlayingBar />
          <PremiumAlert />
        </Providers>
      </body>
    </html>
  );
}
