import { create, type StoreApi, type UseBoundStore } from "zustand";

export const fileStore: UseBoundStore<StoreApi<any>> = create((set: any) => ({
  files: [],
  updateListFiles: (name: string) =>
    set((state: any) => ({ files: [...state.files, name] })),
  setFiles: (names: string[]) => set({ files: names }),
  selectedFile: { name: "", content: "" },
  setSelectedFile: (snippet: any) => set({ selectedFile: snippet }),
  fileIsEdited: false,
  editedFile: () =>
    set((state: any) => ({ fileIsEdited: !state.fileIsEdited })),
}));
