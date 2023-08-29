import { create } from "zustand";

interface IGlobalStore {
  isLoading: boolean;
}

export const useGlobalStore = create<IGlobalStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
