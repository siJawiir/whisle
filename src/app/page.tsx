"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function HomePage() {
  const { data: session } = useSession();

  if (!!session) redirect("/discover");

  return (
    <section className="h-full w-full flex flex-col justify-center px-6 md:px-10 max-w-6xl mx-auto overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-sky-400">
          Welcome to Whisle
        </span>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.8] uppercase">
          Pure <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-300 to-sky-600">
            Vibration.
          </span>
        </h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4">
          <p className="max-w-md text-zinc-400 text-xs md:text-sm font-medium leading-relaxed">
            Experience the next evolution of sound. Stream your favorite tracks
            with high-fidelity clarity and zero distractions.
          </p>
        </div>
      </div>
    </section>
  );
}
