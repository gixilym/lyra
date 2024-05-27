import toast from "react-hot-toast";
import { type NavigateFunction, useNavigate } from "react-router-dom";
import useStorage from "../hooks/useStorage";
import { BASE_DIRECTORY, FONTS, LANGS, MAIN_FOLDER, THEMES } from "./consts";
import { createDir, exists } from "@tauri-apps/api/fs";

function navigation(): { goTo: (route: string) => void } {
  const navigate: NavigateFunction = useNavigate();
  const goTo = (route: string): void => navigate(route);
  return { goTo };
}

function notification(type: "success" | "error", msg: string): void {
  toast[type](msg, {
    duration: 2000,
    style: { backgroundColor: "#202020", color: "#fff" },
  });
}

function nameIsValid(name: string): boolean {
  const regex: RegExp = /^[a-zA-Z0-9-_ ]+$/;
  const nameIsLong: boolean = name.length > 25;
  const invalidSymbols: boolean = !regex.test(name);

  if (nameIsLong) {
    notification("error", "Nombre demasiado extenso");
    return false;
  }

  if (invalidSymbols) {
    notification("error", "El nombre contiene caracteres inválidos");
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
    const folderExists: boolean = await exists(MAIN_FOLDER, BASE_DIRECTORY);
    if (!folderExists) {
      createDir(MAIN_FOLDER, BASE_DIRECTORY);
      break;
    } else break;
  }
}

function myLang(): string {
  const { getItem } = useStorage();
  const lang: string = getItem("language") ?? LANGS.en;
  return lang == LANGS.en ? "English" : "Español";
}

function myFont(): string {
  const { getItem } = useStorage();
  const font: string = getItem("font") ?? FONTS[0].value;
  return font == FONTS[0].value ? FONTS[0].label : FONTS[1].label;
}

export {
  myLang,
  myFont,
  notification,
  navigation,
  nameIsValid,
  themes,
  paperFiles,
  verifyMainFolder,
};

interface Themes {
  isSunnyDay: boolean;
  isClearNigth: boolean;
  isDarkNigth: boolean;
}
