"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut, AlertCircle } from "lucide-react";

interface LogoutWarningProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onLogout: () => void;
}

export default function LogoutWarning({
  isOpen,
  setIsOpen,
  onLogout,
}: LogoutWarningProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-100 bg-zinc-950 border-zinc-800 text-zinc-300 shadow-2xl">
        <DialogHeader className="flex flex-col items-center gap-4 pt-4">
          <div className="p-3 bg-red-500/10 rounded-full">
            <AlertCircle className="text-red-500" size={32} />
          </div>
          <DialogTitle className="text-2xl font-bold text-white text-center tracking-tight">
            Sign Out
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-400 leading-relaxed">
            Are you sure you want to sign out of{" "}
            <span className="text-white font-semibold">Whisle</span>? Your
            active playback session and real-time sync will be disconnected.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="flex-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all font-medium"
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-red-900/20"
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
