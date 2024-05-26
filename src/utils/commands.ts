import { appWindow } from "@tauri-apps/api/window";
import { notification } from "./helpers";
import { configStore } from "../store/configStore";
import translations from "../translate/dictionary";
import useStorage from "../hooks/useStorage";
import type { Dispatch, SetStateAction } from "react";
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

function toggleSpellchecker(): void {
  const { setSpellCheck, spellCheck } = configStore();
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
  toggleFullScreen,
  toggleSpellchecker,
  centerText,
  reduceText,
  increaseText,
};

type SetStyles = Dispatch<SetStateAction<StylesText>>;
