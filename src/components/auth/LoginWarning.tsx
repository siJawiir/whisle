/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react"; 

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
      <DialogContent className="sm:max-w-125 bg-zinc-950 border-zinc-800 text-zinc-300 shadow-2xl rounded-3xl">
        <DialogHeader className="flex flex-col items-center gap-5 pt-6">
          <img
            src="/logo/whisle.png"
            alt="Whisle"
            className="w-14 h-14 drop-shadow-[0_0_15px_rgba(14,165,233,0.4)]"
          />
          <DialogTitle className="text-3xl font-black text-white text-center tracking-tight">
            Exclusive Access
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4 px-2">
          <div className="p-5 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl space-y-4">
            <div className="space-y-3">
              <p className="flex gap-3 text-sm leading-relaxed">
                <span className="text-sky-500 mt-1">✦</span>
                <span>
                  Whisle is currently in{" "}
                  <span className="text-white font-medium">private beta</span>.
                  To join, please whitelist your account by contacting our
                  admin.
                </span>
              </p>

              <a
                href="mailto:raihanmarwanda@gmail.com?subject=Whisle Access Request&body=Hi! I'd like to request access to Whisle. My Name: [Your Name]"
                className="flex items-center gap-2 ml-7 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors group"
              >
                <Mail className="w-3.5 h-3.5" />
                Contact: raihanmarwanda@gmail.com
                <span className="opacity-0 group-hover:opacity-100 transition-all ml-1">
                  →
                </span>
              </a>
            </div>

            <div className="h-px bg-zinc-800/50 w-full" />

            <p className="flex gap-3 text-sm leading-relaxed">
              <span className="text-sky-500 mt-1">✦</span>
              <span>
                Full playback requires a{" "}
                <strong className="text-white font-semibold underline decoration-sky-500 decoration-2 underline-offset-4">
                  Spotify Premium
                </strong>{" "}
                account.
              </span>
            </p>

            <p className="text-zinc-500 text-[11px] font-medium leading-snug pl-7 italic">
              Don&apos;t have access? You can still explore trending tracks and
              curated vibes.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pb-4">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="flex-1 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all font-semibold"
          >
            Maybe Later
          </Button>

          <Button
            onClick={() => {
              setIsOpen(false);
              onLogin();
            }}
            className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-full shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-95 "
          >
            I&apos;m Approved, Let&apos;s Go!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
