import { create } from "zustand";
import type { ZustandStore } from "../utils/types";

export const searchStore: ZustandStore = create((set: any) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
  resetSearch: () => set({ search: "" }),
  order: true,
  toggleOrder: (newOrder: boolean) => set({ order: newOrder }),
}));
