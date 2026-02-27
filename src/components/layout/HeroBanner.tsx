"use client";

import { siteConfig } from "@/config/site";
import { ArrowRight, Sparkles } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import LoginWarning from "../auth/LoginWarning";
import { Button } from "../ui/button";

export default function HeroBanner() {
  const [showWarning, setShowWarning] = useState(false);

  const handleFinalLogin = () => {
    signIn("spotify", { callbackUrl: "/" });
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-sky-500/10 p-6 @container">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-500/10 blur-[60px]" />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-2 w-fit px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400">
            <Sparkles size={12} />
            <span className="text-[9px] font-bold uppercase tracking-widest">
              Premium Feature
            </span>
          </div>

          <div className="flex flex-col @md:flex-row @md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <h2 className="text-2xl @md:text-3xl font-bold tracking-tight text-white">
                Unlock <span className="text-sky-400">Rhythm.</span>
              </h2>
              <p className="max-w-md text-sm font-medium text-zinc-400 leading-relaxed">
                Connect your <span className="text-sky-400/80">Spotify</span> to
                sync your library and start streaming with {siteConfig.name}.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={() => setShowWarning(true)}
                className="group/btn flex items-center gap-2 h-10 px-5 bg-sky-500 hover:bg-sky-400 text-zinc-950 text-xs font-bold rounded-full transition-all active:scale-95 shadow-lg shadow-sky-500/10"
              >
                Connect Spotify
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover/btn:translate-x-0.5"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <LoginWarning
        isOpen={showWarning}
        setIsOpen={setShowWarning}
        onLogin={handleFinalLogin}
      />
    </>
  );
}
