"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePremiumStore } from "@/zustand/usePremiumStore";
import { Crown, ExternalLink } from "lucide-react";

export function PremiumAlert() {
  const { isOpen, closeModal, artistName, artistUrl } = usePremiumStore();

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-md">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 bg-sky-500/10 rounded-full flex items-center justify-center">
            <Crown className="h-8 w-8 text-sky-500" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            Premium Required
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-center">
            Web playback needs Spotify Premium. You can still listen to{" "}
            <strong>{artistName}</strong> on the app!
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Button
            onClick={() => window.open(artistUrl, "_blank")}
            className="bg-white text-black hover:bg-zinc-200 font-bold py-6 rounded-full flex gap-2"
          >
            <ExternalLink size={18} /> Open in Spotify
          </Button>
          <Button
            variant="ghost"
            onClick={closeModal}
            className="text-zinc-400"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
