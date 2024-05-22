import { BaseDirectory } from "@tauri-apps/api/fs";
import type { Pages } from "./types";

const BASE_DIRECTORY: { dir: BaseDirectory } = { dir: BaseDirectory.Document };

const FOLDER_NAME: string = "lyra";

const CONFIG_NAME: string = "config.json";

const PAGES: Pages = {
  presentation: "/",
  list: "/list",
  backupcopy: "/backupcopy",
  contact: "/contact",
  preferences: "/preferences",
  file: "/file",
};

export { BASE_DIRECTORY, FOLDER_NAME, CONFIG_NAME, PAGES };
