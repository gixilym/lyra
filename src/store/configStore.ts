import { create } from "zustand";

export const configStore = create((set: any) => ({
  userConfig: {
    language: "es",
    theme: "bg-black/90",
    fontSize: "text-2xl",
    fontFamily: "font-duo",
    textCenter: false,
    paper: [],
  },

  setUserConfig: (newConfig: object) =>
    set((state: any) => ({
      userConfig: { ...state.userConfig, ...newConfig },
    })),

  paperIsOpen: false,

  setPaperIsOpen: () =>
    set((state: any) => ({ paperIsOpen: !state.paperIsOpen })),

  addItemToPaper: (name: string) =>
    set((state: any) => ({
      userConfig: {
        ...state.userConfig,
        paper: [...state.userConfig.paper, name],
      },
    })),

  removeItemFromPaper: (name: string) =>
    set((state: any) => ({
      userConfig: {
        ...state.userConfig,
        paper: state.userConfig.paper.filter((n: string) => n != name),
      },
    })),

  cleanPaper: () => set((state: any) => ({ ...state.userConfig, paper: [] })),

  spellCheck: false,

  setSpellCheck: () => set((state: any) => ({ spellCheck: !state.spellCheck })),
}));
