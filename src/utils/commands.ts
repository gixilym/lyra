import { appWindow } from "@tauri-apps/api/window";
import type { Dispatch, SetStateAction } from "react";
import useStorage from "../hooks/useStorage";
import translations from "./dictionary";
import { notification } from "./helpers";
import type { StylesText } from "./types";

async function toggleFullScreen(): Promise<void> {
  const isFullScreen = await appWindow.isFullscreen();
  if (isFullScreen) appWindow.setFullscreen(false);
  else appWindow.setFullscreen(true);
}

function centerText(styles: StylesText, setStyles: SetStyles): void {
  const { setItem } = useStorage();
  const textMode: string =
    styles.textCenter == "text-center" ? "text-start" : "text-center";
  setItem("text-center", textMode);
  setStyles({ ...styles, textCenter: textMode });
}

function increaseText(styles: StylesText, setStyles: SetStyles): void {
  const { setItem } = useStorage();
  setItem("font-size", "text-xl");
  setStyles({ ...styles, fontSize: "text-xl" });
}

function reduceText(styles: StylesText, setStyles: SetStyles): void {
  const { setItem } = useStorage();
  setItem("font-size", "text-lg");
  setStyles({ ...styles, fontSize: "text-lg" });
}

function toggleSpellchecker(spellCheck: boolean, setSpellCheck: any): void {
  const d = translations();
  if (spellCheck) {
    setSpellCheck();
    return notification("error", d.SpellcheckerOff);
  } else {
    setSpellCheck();
    return notification("success", d.SpellcheckerOn);
  }
}

export {
  centerText,
  increaseText,
  reduceText,
  toggleFullScreen,
  toggleSpellchecker,
};

type SetStyles = Dispatch<SetStateAction<StylesText>>;
