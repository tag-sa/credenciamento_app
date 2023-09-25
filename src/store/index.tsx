import { create } from "zustand";

interface IGlobalStore {
  isLoading: boolean;
  hideBottomTabBar: boolean;
  setHideBottomTabBar: (hideBottomTabBar: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useGlobalStore = create<IGlobalStore>((set) => ({
  isLoading: false,
  hideBottomTabBar: false,
  setHideBottomTabBar: (hideBottomTabBar: boolean) => set({ hideBottomTabBar }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
