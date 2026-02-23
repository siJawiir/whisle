import { create } from 'zustand';

interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
  setIsOpen: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true, 
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsOpen: (value) => set({ isOpen: value }),
}));