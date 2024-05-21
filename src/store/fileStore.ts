import { create } from "zustand";

export const fileStore = create((set: any) => ({
  files: [],

  updateListFiles: (name: string) =>
    set((state: any) => ({ files: [...state.files, name] })),

  setFiles: (names: string) => set({ files: names }),

  selectedFile: { name: "", content: "" },

  setSelectedFile: (snippet: any) => set({ selectedFile: snippet }),

  removeFileFromStore: (snippet: any) =>
    set((state: any) => ({
      files: state.files.filter((n: string) => n != snippet),
    })),

  fileIsEdited: false,
  editedFile: () =>
    set((state: any) => ({ fileIsEdited: !state.fileIsEdited })),
}));
