import { create } from "zustand";

interface PremiumStore {
  isOpen: boolean;
  artistName: string;
  artistUrl: string;
  openModal: (name?: string, url?: string) => void;
  closeModal: () => void;
}

export const usePremiumStore = create<PremiumStore>((set) => ({
  isOpen: false,
  artistName: "",
  artistUrl: "",
  openModal: (name = "this artist", url = "https://open.spotify.com") =>
    set({ isOpen: true, artistName: name, artistUrl: url }),
  closeModal: () => set({ isOpen: false }),
}));
