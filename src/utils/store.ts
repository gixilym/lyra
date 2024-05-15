import { create } from "zustand";

export const useStore = create((set: any) => ({
  files: [],

  updateListFiles: (name: string) =>
    set((state: any) => ({ files: [...state.files, name] })),

  setFiles: (names: string) => set({ files: names }),

  selectedFile: { name: "", content: "" },

  setSelectedFile: (snippet: any) => set({ selectedFile: snippet }),

  removeFile: (snippet: any) =>
    set((state: any) => ({
      files: state.files.filter((n: string) => n != snippet),
    })),

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
}));
