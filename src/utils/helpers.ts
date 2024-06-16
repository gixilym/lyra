import { createDir, exists, writeTextFile } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";
import toast from "react-hot-toast";
import { type NavigateFunction, useNavigate } from "react-router-dom";
import useStorage from "../hooks/useStorage";
import {
  BACKUP_FOLDER,
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
  const isActive: boolean = JSON.parse(getItem("word-count") as string) ?? true;
  return isActive;
}

function myLastModified(): boolean {
  const { getItem } = useStorage();
  const isActive: boolean =
    JSON.parse(getItem("last-modified") as string) ?? true;
  return isActive;
}

function copyText(text: string): void {
  const d = translations();
  navigator.clipboard.writeText(text);
  notification("success", d.CopiedToClipboard);
}

function getDate(): string {
  const d = translations(),
    date = new Date(),
    day = date.getDate().toString().padStart(2, "0"),
    month = (date.getMonth() + 1).toString().padStart(2, "0"),
    year = date.getFullYear().toString().slice(-2),
    hour = date.getHours().toString().padStart(2, "0"),
    minutes = date.getMinutes().toString().padStart(2, "0"),
    formattedDate = `${hour}:${minutes} h ${d.On} ${day}/${month}/${year}`;
  return formattedDate;
}

async function backupExists(): Promise<boolean> {
  const res: boolean = await exists(BACKUP_FOLDER, BASE_DIRECTORY);
  return res;
}

function stylesSelect(): any {
  const { isSunnyDay } = themes();
  return {
    placeholder: (styles: any) => ({
      ...styles,
      color: isSunnyDay ? "#000" : "#d8d8d8",
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: isSunnyDay ? "#000" : "#d8d8d8",
    }),
    control: (styles: any) => ({
      ...styles,
      backgroundColor: isSunnyDay ? "#c0c0c0" : "#2b2b2b",
      border: isSunnyDay ? "1px solid #2b2b2b" : "1px solid #c0c0c0",
      color: isSunnyDay ? "#000" : "#d8d8d8",
      boxShadow: "0",
      width: "160px",
    }),
    option: (styles: any) => ({
      ...styles,
      ":active": { backgroundColor: isSunnyDay ? "#b0b0b0" : "#2b2b2b" },
      ":hover": { backgroundColor: isSunnyDay ? "#b0b0b0" : "#3e3e3e" },
      backgroundColor: isSunnyDay ? "#c0c0c0" : "#2b2b2b",
      border: 0,
      color: isSunnyDay ? "#000" : "#e7e7e7",
    }),
    menu: (styles: any) => ({
      ...styles,
      backgroundColor: isSunnyDay ? "#c0c0c0" : "#2b2b2b",
      marginTop: 2,
    }),
  };
}

export {
  stylesSelect,
  backupExists,
  myLastModified,
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
  getDate,
};

interface Themes {
  isSunnyDay: boolean;
  isClearNigth: boolean;
  isDarkNigth: boolean;
}
