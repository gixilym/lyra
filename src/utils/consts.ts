import { BaseDirectory } from "@tauri-apps/api/fs";
import type { Pages } from "./types";

const BASE_DIRECTORY: { dir: BaseDirectory } = { dir: BaseDirectory.Document };

const MAIN_FOLDER: string = "lyra";

const PAGES: Pages = {
  presentation: "/",
  list: "/list",
  backupcopy: "/backupcopy",
  contact: "/contact",
  preferences: "/preferences",
  file: "/file",
};

export { BASE_DIRECTORY, MAIN_FOLDER, PAGES };
