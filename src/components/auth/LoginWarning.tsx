/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LoginWarningProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onLogin: () => void;
}

export default function LoginWarning({
  isOpen,
  setIsOpen,
  onLogin,
}: LoginWarningProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-125 bg-zinc-950 border-zinc-800 text-zinc-300 shadow-2xl">
        <DialogHeader className="flex flex-col items-center gap-5 pt-4">
          <img src="/logo/whisle.png" alt="Whisle" className="w-12 h-12" />
          <DialogTitle className="text-3xl font-extrabold text-white text-center tracking-tight">
            Playback Restricted
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 text-sm leading-relaxed py-4 px-2">
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-3">
            <p className="flex gap-2">
              <span className="text-sky-500">●</span>
              <span>
                Full music playback is exclusively available for users with a{" "}
                <strong className="text-white font-semibold underline decoration-sky-500/50 underline-offset-4">
                  Spotify Premium
                </strong>{" "}
                account.
              </span>
            </p>
            <p className="text-zinc-500 text-xs italic leading-snug">
              Don&apos;t worry! You can still explore tracks, artists, albums,
              and discover new playlists available on Whisle.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="flex-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all font-bold"
          >
            Maybe Later
          </Button>

          <Button
            onClick={() => {
              setIsOpen(false);
              onLogin();
            }}
            className="flex-1 bg-sky-500 hover:bg-sky-400 text-black font-bold rounded-full shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span className="sm:hidden text-pretty">I Understand</span>
            <span className="hidden sm:inline">
              I Understand, Let&apos;s Go!
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
