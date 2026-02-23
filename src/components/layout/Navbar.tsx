/* eslint-disable @next/next/no-img-element */
"use client";

import { Bell, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebarStore } from "@/zustand/useSidebarStore";

import { cn } from "@/lib/utils";
import SearchBar from "../spotify/SearchTrack";
import LoginButton from "../auth/LoginButton";
import LogoutButton from "../auth/LogoutButton";

export default function Navbar() {
  const { data: session } = useSession();
  const { isOpen, toggle } = useSidebarStore();
  const user = session?.user;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center h-16 px-4 bg-background/60 backdrop-blur-xl border-b border-border/40">
      <div
        className={cn(
          "flex items-center gap-3 transition-all duration-300 shrink-0",
          isOpen ? "w-60" : "w-12",
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="hover:bg-sky-500/10 hover:text-sky-400"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Link
          href="/"
          className={cn("flex items-center gap-2 transition-all duration-300")}
        >
          <img src="/logo/whisle.png" alt="Logo" className="h-6 w-auto" />
          <span className="text-xl font-black tracking-tighter uppercase italic text-white">
            Whisle
          </span>
        </Link>
      </div>

      <div className="flex-1 flex justify-center max-w-2xl mx-auto">
        <div className="w-full relative group px-4">
          <SearchBar />
        </div>
      </div>

      <div className="flex items-center gap-2 min-w-fit">
        {!user ? (
          <LoginButton />
        ) : (
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex text-muted-foreground hover:text-white"
            >
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full p-0 overflow-hidden border border-border group"
                >
                  <Avatar className="h-9 w-9 transition-transform group-hover:scale-110">
                    <AvatarImage src={user.image || ""} alt={user.name || ""} />
                    <AvatarFallback className="bg-sky-500 text-white font-bold text-xs">
                      {user.name?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-zinc-950 border-zinc-800"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none text-white">
                      {user.name}
                    </p>
                    <p className="text-[10px] leading-none text-sky-400 font-medium italic">
                      Spotify Premium
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem className="cursor-pointer focus:bg-white/5">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer focus:bg-white/5">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <div className="p-1">
                  <LogoutButton />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </nav>
  );
}
