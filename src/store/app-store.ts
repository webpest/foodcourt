import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export type Setting = {
  uppercase: boolean;
  lowercase: boolean;
  figures: boolean;
  special: boolean;
  length: boolean;
};

type AppState = {
  setting: Setting | null;
};

type AppActions = {
  setSetting: (setting: Setting) => void;
};

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    persist(
      (set) => ({
        setting: null,
        setSetting: (setting: Setting) => set({ setting }),
      }),
      {
        name: "appStore",
      }
    )
  )
);
