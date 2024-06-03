import { create } from "zustand";
import type { ZustandStore } from "../utils/types";

export const configStore: ZustandStore = create((set: any) => ({
  paperIsOpen: false,
  setPaperIsOpen: () =>  
    set((state: any) => ({ paperIsOpen: !state.paperIsOpen })),
  spellCheck: false,
  setSpellCheck: () => set((state: any) => ({ spellCheck: !state.spellCheck })),
  showHeader: true,
  setShowHeader: () => set((state: any) => ({ showHeader: !state.showHeader })),
}));
