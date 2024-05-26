import { BaseDirectory } from "@tauri-apps/api/fs";

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

const THEMES: Themes = { 
  clearNigth: "clear-nigth",
  darkNigth: "dark-nigth",
  sunnyDay: "sunny-day",
};

const LANGS: Langs = {
  es: "ES",
  en: "EN",
};

export { BASE_DIRECTORY, MAIN_FOLDER, PAGES, THEMES, LANGS };

interface Pages {
  presentation: string;
  list: string;
  backupcopy: string;
  contact: string;
  preferences: string;
  file: string;
}

interface Themes {
  clearNigth: string;
  darkNigth: string;
  sunnyDay: string;
}

interface Langs {
  es: string;
  en: string;
}
