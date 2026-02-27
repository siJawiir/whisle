"use client";

import { SpotifyArtist } from "@/@types/spotify";
import { getTopArtists } from "@/lib/spotify";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/zustand/useSidebarStore";
import { useQuery } from "@tanstack/react-query";
import { Compass, Heart, History, Home } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import LoginWarning from "../auth/LoginWarning";
import HeroBanner from "./HeroBanner";
import { ScrollArea } from "../ui/scroll-area";

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  active: boolean;
  isOpen: boolean;
  href: string;
}

interface SectionLabelProps {
  label: string;
  isOpen: boolean;
}

export default function Sidebar() {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const { data: session } = useSession();
  const [showWarning, setShowWarning] = useState(false);
  const pathname = usePathname();

  const { data: topArtists } = useQuery<SpotifyArtist[]>({
    queryKey: ["sidebar-artists"],
    queryFn: () => getTopArtists(8),
    enabled: !!session?.accessToken,
  });

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <>
      <aside
        className={cn(
          "h-screen bg-black border-r border-white/5 pt-16 transition-all duration-300 ease-in-out flex flex-col shrink-0 overflow-hidden",
          isOpen ? "w-64" : "w-20",
        )}
      >
        <div className="flex flex-col gap-1 p-4 shrink-0">
          <SidebarItem
            href={session ? "/discover" : "/"}
            icon={session ? <Compass size={22} /> : <Home size={22} />}
            label={session ? "Discover" : "Home"}
            active={isActive(session ? "/discover" : "/")}
            isOpen={isOpen}
          />
        </div>

        {!session ? (
          isOpen && (
            <div className="px-4 shrink-0">
              <HeroBanner />
            </div>
          )
        ) : (
          <div className="flex flex-col flex-1 min-h-0"> 
            
            <div className="shrink-0">
              <SectionLabel label="My Music" isOpen={isOpen} />
              <div className="flex flex-col gap-1 px-4">
                <SidebarItem
                  href="/saved"
                  icon={<Heart size={22} />}
                  label="Saved Songs"
                  active={isActive("/saved")}
                  isOpen={isOpen}
                />
                <SidebarItem
                  href="/history"
                  icon={<History size={22} />}
                  label="History"
                  active={isActive("/history")}
                  isOpen={isOpen}
                />
              </div>
            </div>

            <SectionLabel label="Library" isOpen={isOpen} />

            <ScrollArea className="flex-1 min-h-0 px-4 w-full">
              <div className="flex flex-col gap-1 pb-6">
                {topArtists?.map((artist) => (
                  <ArtistLink key={artist.id} artist={artist} isOpen={isOpen} />
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </aside>

      <LoginWarning
        isOpen={showWarning}
        setIsOpen={setShowWarning}
        onLogin={() => signIn("spotify", { callbackUrl: "/" })}
      />
    </>
  );
}

function SectionLabel({ label, isOpen }: SectionLabelProps) {
  return (
    <div className="mt-6 px-6 mb-2">
      {isOpen ? (
        <p className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">
          {label}
        </p>
      ) : (
        <div className="h-px bg-white/10 w-full" />
      )}
    </div>
  );
}

function ArtistLink({
  artist,
  isOpen,
}: {
  artist: SpotifyArtist;
  isOpen: boolean;
}) {
  return (
    <Link href={`/artist/${artist.id}`}>
      <div
        className={cn(
          "flex items-center gap-4 p-2 rounded-lg hover:bg-white/5 transition-all group",
          !isOpen && "justify-center",
        )}
      >
        <div className="relative w-8 h-8 shrink-0">
          <Image
            src={artist.images[0]?.url || "/default-artist.png"}
            alt={artist.name}
            fill
            className="rounded-md object-cover"
          />
        </div>
        {isOpen && (
          <span className="text-sm text-zinc-400 group-hover:text-white truncate font-medium">
            {artist.name}
          </span>
        )}
      </div>
    </Link>
  );
}

function SidebarItem({ icon, label, active, isOpen, href }: SidebarItemProps) {
  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all group",
          active
            ? "text-white bg-white/5"
            : "text-zinc-400 hover:text-white hover:bg-white/5",
          !isOpen && "justify-center",
        )}
      >
        <div className={cn("shrink-0", active && "text-sky-400")}>{icon}</div>
        {isOpen && (
          <span className="text-sm font-medium truncate">{label}</span>
        )}
      </div>
    </Link>
  );
}
