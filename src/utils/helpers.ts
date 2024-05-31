import { createDir, exists, writeTextFile } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";
import toast from "react-hot-toast";
import { type NavigateFunction, useNavigate } from "react-router-dom";
import useStorage from "../hooks/useStorage";
import {
  BASE_DIRECTORY,
  FONTS,
  INTRODUCTION,
  LANGS,
  MAIN_FOLDER,
  THEMES,
} from "./consts";
import translations from "./dictionary";

function navigation(): { goTo: (route: string) => void } {
  const navigate: NavigateFunction = useNavigate();
  const goTo = (route: string): void => navigate(route);
  return { goTo };
}

function notification(type: "success" | "error", msg: string): void {
  toast[type](msg, {
    duration: 2000,
    style: {
      backgroundColor: "#202020",
      color: "#fff",
      padding: "6px 20px",
    },
  });
}

function nameIsValid(name: string): boolean {
  const regex: RegExp = /^[a-zA-Z0-9-_ ]+$/;
  const nameIsLong: boolean = name.length > 25;
  const invalidSymbols: boolean = !regex.test(name);
  const d = translations();

  if (nameIsLong) {
    notification("error", d.VeryLongName);
    return false;
  }

  if (invalidSymbols) {
    notification("error", d.NoSpecialCharacters);
    return false;
  }

  return true;
}

function themes(): Themes {
  const { getItem } = useStorage(),
    theme: string = getItem("theme") ?? THEMES.clearNigth,
    isSunnyDay: boolean = theme == THEMES.sunnyDay,
    isClearNigth: boolean = theme == THEMES.clearNigth,
    isDarkNigth: boolean = theme == THEMES.darkNigth;
  return { isSunnyDay, isClearNigth, isDarkNigth };
}

function paperFiles(): string[] {
  const { getItem } = useStorage();
  const paper: string[] = JSON.parse(getItem("paper") as string) ?? [];
  return paper;
}

async function verifyMainFolder(): Promise<void> {
  while (true) {
    const mainFolderExits: boolean = await exists(MAIN_FOLDER, BASE_DIRECTORY);
    const path: string = await join(MAIN_FOLDER, "Bienvenido a lyra.txt");
    if (!mainFolderExits) {
      createDir(MAIN_FOLDER, BASE_DIRECTORY)
        .then(() => writeTextFile(path, INTRODUCTION, BASE_DIRECTORY))
        .catch(e => console.error(`Error creando carpeta lyra: ${e.message}`));
      break;
    } else break;
  }
}

function myLang(): string {
  const { getItem } = useStorage();
  const lang: string = getItem("language") ?? LANGS.en;
  return lang == LANGS.en ? "English" : "Español";
}

function myFont(value: boolean): string {
  const { getItem } = useStorage();
  const font: string = getItem("font") ?? FONTS[0].value;
  const val = value ? "value" : "label";
  return font == FONTS[0].value ? FONTS[0][val] : FONTS[1][val];
}

function myWordCount(): boolean {
  const { getItem } = useStorage();
  const count: boolean = JSON.parse(getItem("word-count") as string) ?? true;
  return count;
}

function copyText(text: string): void {
  const d = translations();
  navigator.clipboard.writeText(text);
  notification("success", d.CopiedToClipboard);
}

export {
  copyText,
  myWordCount,
  myFont,
  myLang,
  nameIsValid,
  navigation,
  notification,
  paperFiles,
  themes,
  verifyMainFolder,
};

interface Themes {
  isSunnyDay: boolean;
  isClearNigth: boolean;
  isDarkNigth: boolean;
}
