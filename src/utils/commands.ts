import { appWindow } from "@tauri-apps/api/window";
import type { Dispatch, SetStateAction } from "react";
import useStorage from "../hooks/useStorage";
import translations from "./dictionary";
import { notification } from "./helpers";
import type { StylesText } from "./types";

async function toggleFullScreen(): Promise<void> {
  const isFullScreen: boolean = await appWindow.isFullscreen();
  if (isFullScreen) appWindow.setFullscreen(false);
  else appWindow.setFullscreen(true);
}

function alignText(styles: StylesText, setStyles: SetStyles): void {
  const { setItem } = useStorage();

  function alternateText(): string {
    switch (styles.alignText) {
      case "text-start":
        return "text-center";

      case "text-center":
        return "text-right";

      case "text-right":
        return "text-start";

      default:
        return "text-start";
    }
  }

  setItem("align-text", alternateText());
  setStyles({ ...styles, alignText: alternateText() });
}

function increaseText(styles: StylesText, setStyles: SetStyles): void {
  const { setItem, getItem } = useStorage();
  const textSize: string = (getItem("font-size") as string) ?? "text-lg";

  function changeSize(): string {
    switch (textSize) {
      case "text-sm":
        return "text-md";

      case "text-md":
        return "text-lg";

      case "text-lg":
        return "text-xl";

      case "text-xl":
        return "text-2xl";

      case "text-2xl":
        return "text-2xl";

      default:
        return "text-lg";
    }
  }

  setItem("font-size", changeSize());
  setStyles({ ...styles, fontSize: changeSize() });
}

function reduceText(styles: StylesText, setStyles: SetStyles): void {
  const { setItem, getItem } = useStorage();
  const textSize: string = (getItem("font-size") as string) ?? "text-lg";

  function changeSize(): string {
    switch (textSize) {
      case "text-sm":
        return "text-sm";

      case "text-md":
        return "text-sm";

      case "text-lg":
        return "text-md";

      case "text-xl":
        return "text-lg";

      case "text-2xl":
        return "text-xl";

      default:
        return "text-lg";
    }
  }

  setItem("font-size", changeSize());
  setStyles({ ...styles, fontSize: changeSize() });
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
  alignText,
  increaseText,
  reduceText,
  toggleFullScreen,
  toggleSpellchecker,
};

type SetStyles = Dispatch<SetStateAction<StylesText>>;
