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
  updates: "/updates",
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

const FONTS: Fonts = [
  { value: "font-duo", label: "Monospace" },
  { value: "font-sara", label: "Sarabun" },
];

const SELECT_STYLES = {
  placeholder: (styles: any) => ({ ...styles, color: "#d8d8d8" }),
  singleValue: (styles: any) => ({ ...styles, color: "#d8d8d8" }),
  control: (styles: any) => ({
    ...styles,
    backgroundColor: "#2b2b2b",
    border: 0,
    color: "#d8d8d8",
    boxShadow: "0",
    width: "160px",
  }),
  option: (styles: any) => ({
    ...styles,
    ":active": { backgroundColor: "#2b2b2b" },
    ":hover": { backgroundColor: "#3e3e3e" },
    backgroundColor: "#2b2b2b",
    border: 0,
    color: "#e7e7e7",
  }),
  menu: (styles: any) => ({
    ...styles,
    backgroundColor: "#2b2b2b",
    marginTop: 2,
  }),
};

export {
  BASE_DIRECTORY,
  MAIN_FOLDER,
  PAGES,
  THEMES,
  LANGS,
  FONTS,
  SELECT_STYLES,
};

interface Pages {
  presentation: string;
  list: string;
  backupcopy: string;
  contact: string;
  preferences: string;
  file: string;
  updates: string;
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

type Fonts = { value: string; label: string }[];
