import { invoke } from "@tauri-apps/api";
import { createDir, exists, writeTextFile } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";
import { flushSync } from "react-dom";
import toast from "react-hot-toast";
import { type NavigateFunction, useNavigate } from "react-router-dom";
import usePreferences from "../hooks/usePreferences";
import useStorage from "../hooks/useStorage";
import {
  BASE_DIRECTORY,
  INTRO_EN,
  INTRO_ES,
  LANGS,
  MAIN_FOLDER,
  THEMES,
  WELCOME_EN,
  WELCOME_ES,
} from "./consts";
import translations from "./dictionary";
import type { Timer } from "./types";

const reload = (): void => window.location.reload();

function navigation(): Navigation {
  const navigate: NavigateFunction = useNavigate();

  function goTo(path: string): void {
    document.startViewTransition(() => flushSync(() => navigate(path)));
  }

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
  const d = translations(),
    regex: RegExp = /^[a-zA-ZÀ-ÿ0-9-_ !¡¿?]+$/,
    nameIsLong: boolean = len(name) > 25,
    invalidSymbols: boolean = !regex.test(name);

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
  const { myTheme } = usePreferences(),
    isDay: boolean = myTheme() == THEMES.Day,
    isClearNigth: boolean = myTheme() == THEMES.clearNigth;
  return { isDay, isClearNigth };
}

async function getSystemLang(): Promise<string> {
  const lang: string = await invoke("get_system_lang");
  if (lang.startsWith("es-")) return LANGS.es;
  else return LANGS.en;
}

async function verifySystemLang(): Promise<void> {
  const { setItem } = useStorage();
  const { myLangValue } = usePreferences();
  if (myLangValue("nothing") == "nothing") {
    let lang: string = await getSystemLang();
    lang = lang == LANGS.es ? LANGS.es : LANGS.en;
    setItem("language", lang);
    reload();
  }
}

async function verifyMainFolder(): Promise<void> {
  const systemLang: string = await getSystemLang(),
    isSpanish: boolean = systemLang == LANGS.es,
    welcome: string = isSpanish ? WELCOME_ES : WELCOME_EN,
    intro: string = isSpanish ? INTRO_ES : INTRO_EN;

  while (true) {
    const mainFolderExits: boolean = await exists(MAIN_FOLDER, BASE_DIRECTORY);
    const path: string = await join(MAIN_FOLDER, welcome);
    if (!mainFolderExits) {
      createDir(MAIN_FOLDER, BASE_DIRECTORY)
        .then(() => writeTextFile(path, intro, BASE_DIRECTORY))
        .catch(e => console.error(`catch 'verifyMainFolder' ${e.message}`));
      break;
    } else break;
  }
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

function stylesSelect(): any {
  const { isDay } = themes();
  return {
    placeholder: (styles: any) => ({
      ...styles,
      color: isDay ? "#000" : "#d8d8d8",
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: isDay ? "#000" : "#d8d8d8",
    }),
    control: (styles: any) => ({
      ...styles,
      backgroundColor: isDay ? "#c0c0c0" : "#2b2b2b",
      border: isDay ? "1px solid #2b2b2b" : "1px solid #c0c0c0",
      color: isDay ? "#000" : "#d8d8d8",
      boxShadow: "0",
      width: "160px",
    }),
    option: (styles: any) => ({
      ...styles,
      ":active": { backgroundColor: isDay ? "#b0b0b0" : "#2b2b2b" },
      ":hover": { backgroundColor: isDay ? "#b0b0b0" : "#3e3e3e" },
      backgroundColor: isDay ? "#c0c0c0" : "#2b2b2b",
      border: 0,
      color: isDay ? "#000" : "#e7e7e7",
    }),
    menu: (styles: any) => ({
      ...styles,
      backgroundColor: isDay ? "#c0c0c0" : "#2b2b2b",
      marginTop: 2,
    }),
  };
}

function featherAnimation(): () => void {
  const feather = document.getElementById("feather") as HTMLDivElement;
  const timer: Timer = setTimeout(() => feather?.classList.add("visible"), 300);
  return () => clearTimeout(timer);
}

function pathIs(path: string): boolean {
  const currentPath: string = window.location.pathname;
  return currentPath == path;
}

const normalize = (text: string): string =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const len = (val: string | any[]): number => val.length;

export {
  copyText,
  featherAnimation,
  getDate,
  getSystemLang,
  len,
  nameIsValid,
  navigation,
  normalize,
  notification,
  pathIs,
  reload,
  stylesSelect,
  themes,
  verifyMainFolder,
  verifySystemLang,
};

interface Themes {
  isDay: boolean;
  isClearNigth: boolean;
}

type Navigation = { goTo: (path: string) => void };
