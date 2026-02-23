"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/zustand/useSidebarStore";
import { Compass, Home, LayoutGrid, Library, Mic2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import HeroBanner from "./HeroBanner";
import LoginWarning from "../auth/LoginWarning";

export default function Sidebar() {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const { data: session } = useSession();
  const [showWarning, setShowWarning] = useState(false);

  const handleLoginAction = () => {
    signIn("spotify", { callbackUrl: "/" });
  };

  return (
    <>
      <aside
        className={cn(
          "h-screen bg-black border-r border-white/5 pt-16 transition-all duration-300 ease-in-out flex flex-col shrink-0",
          isOpen ? "w-64" : "w-20",
        )}
      >
        {!session ? (
          <div>
            {isOpen ? (
              <div className="flex flex-col gap-2 p-4">
                <SidebarItem
                  icon={<Home size={24} />}
                  label="Home"
                  active={true}
                  isOpen={isOpen}
                />
                <HeroBanner />
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2 p-4">
                  <SidebarItem
                    icon={<Home size={24} />}
                    label="Home"
                    active={true}
                    isOpen={isOpen}
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 p-4">
              <SidebarItem
                icon={<Compass size={24} />}
                label="Discover"
                isOpen={isOpen}
              />
              <SidebarItem
                icon={<Library size={24} />}
                label="Library"
                isOpen={isOpen}
              />
            </div>

            <div className="mt-4 flex flex-col gap-2 p-4 border-t border-white/5">
              <SidebarItem
                icon={<LayoutGrid size={24} />}
                label="Playlists"
                isOpen={isOpen}
              />
              <SidebarItem
                icon={<Mic2 size={24} />}
                label="Artists"
                isOpen={isOpen}
              />
            </div>
          </>
        )}
      </aside>

      <LoginWarning
        isOpen={showWarning}
        setIsOpen={setShowWarning}
        onLogin={handleLoginAction}
      />
    </>
  );
}

function SidebarItem({
  icon,
  label,
  active,
  isOpen,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  isOpen: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all group",
        active
          ? "bg-white/10 text-white"
          : "text-zinc-400 hover:text-white hover:bg-white/5",
        !isOpen && "justify-center",
      )}
    >
      <div className="shrink-0">{icon}</div>
      {isOpen && <span className="text-sm font-medium truncate">{label}</span>}
    </div>
  );
}
