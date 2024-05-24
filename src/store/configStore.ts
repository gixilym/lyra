import { create } from "zustand";

export const configStore = create((set: any) => ({
  paperIsOpen: false,
  setPaperIsOpen: () =>
    set((state: any) => ({ paperIsOpen: !state.paperIsOpen })),
  spellCheck: false,
  setSpellCheck: () => set((state: any) => ({ spellCheck: !state.spellCheck })),
}));
