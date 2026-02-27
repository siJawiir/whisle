import { Button } from "@/components/ui/button";
import { Music2 } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 min-h-[80vh]">
      <div className="relative mb-8">
        <Music2 size={120} className="text-zinc-800 animate-pulse" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-black text-white">
          404
        </span>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">
        Lost in the rhythm?
      </h2>
      <p className="text-zinc-400 max-w-xs mb-8 leading-relaxed">
        The track or page you&apos;re looking for has been moved or doesn&apos;t
        exist in our playlist.
      </p>

      <Link href="/">
        <Button className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-8 rounded-full transition-all hover:scale-105">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
