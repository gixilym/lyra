import { create, type StoreApi, type UseBoundStore } from "zustand";

export const configStore: UseBoundStore<StoreApi<any>> = create((set: any) => ({
  paperIsOpen: false,
  setPaperIsOpen: () =>
    set((state: any) => ({ paperIsOpen: !state.paperIsOpen })),
  spellCheck: false,
  setSpellCheck: () => set((state: any) => ({ spellCheck: !state.spellCheck })),
}));
