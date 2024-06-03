import { create } from "zustand";
import type { ZustandStore } from "../utils/types";

export const fileStore: ZustandStore = create((set: any) => ({
  files: [],
  updateListFiles: (name: string) =>
    set((state: any) => ({ files: [...state.files, name] })),
  setFiles: (names: string[]) => set({ files: names }),
  removeFileFromList: (name: string) =>
    set((state: any) => ({
      files: state.files.filter((f: string) => f != name),
    })),
  selectedFile: { name: "", content: "" },
  setSelectedFile: (file: any) => set({ selectedFile: file }),
  fileIsEdited: false,
  editedFile: () =>
    set((state: any) => ({ fileIsEdited: !state.fileIsEdited })),
}));
