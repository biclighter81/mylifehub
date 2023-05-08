import { create } from 'zustand';

export type AppStore = {
  isProduction: boolean;
  menu: boolean;
  setMenu: (value: boolean) => void;
};
export const useAppStore = create<AppStore>((set, get) => ({
  isProduction: process.env.NEXT_PUBLIC_IS_PRODUCTION == 'true' ? true : false,
  menu: false,
  setMenu: (value) => set({ menu: value }),
}));
