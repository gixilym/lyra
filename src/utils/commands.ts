import { appWindow } from "@tauri-apps/api/window";
import type { Dispatch, SetStateAction } from "react";
import useStorage from "../hooks/useStorage";
import translations from "./dictionary";
import { notification } from "./helpers";
import type { StylesText } from "./types";
import { PAGES, TEXT_ALIGNS, TEXT_SIZES } from "./consts";

async function toggleFullScreen(): Promise<void> {
  const isFullScreen: boolean = await appWindow.isFullscreen();
  if (isFullScreen) appWindow.setFullscreen(false);
  else appWindow.setFullscreen(true);
}

function alignText(styles: StylesText, setStyles: fnStyles): void {
  if (location.pathname == PAGES.file) {
    const { setItem } = useStorage();
    const { start, center, end } = TEXT_ALIGNS;

    function alternateText(): string {
      switch (styles.alignText) {
        case start:
          return center;

        case center:
          return end;

        case end:
          return start;

        default:
          return start;
      }
    }

    setItem("align-text", alternateText());
    setStyles({ ...styles, alignText: alternateText() });
  }
}

function increaseText(styles: StylesText, setStyles: fnStyles): void {
  if (location.pathname == PAGES.file) {
    const { setItem, getItem } = useStorage();
    const { sm, md, lg, xl, xxl, xxxl } = TEXT_SIZES;
    const textSize: string = (getItem("font-size") as string) ?? lg;

    function changeSize(): string {
      switch (textSize) {
        case sm:
          return md;

        case md:
          return lg;

        case lg:
          return xl;

        case xl:
          return xxl;

        case xxl:
          return xxxl;

        case xxxl:
          return xxxl;

        default:
          return lg;
      }
    }

    setItem("font-size", changeSize());
    setStyles({ ...styles, fontSize: changeSize() });
  }
}

function reduceText(styles: StylesText, setStyles: fnStyles): void {
  if (location.pathname == PAGES.file) {
    const { setItem, getItem } = useStorage();
    const { sm, md, lg, xl, xxl, xxxl } = TEXT_SIZES;
    const textSize: string = getItem("font-size") ?? lg;

    function changeSize(): string {
      switch (textSize) {
        case sm:
          return sm;

        case md:
          return sm;

        case lg:
          return md;

        case xl:
          return lg;

        case xxl:
          return xl;

        case xxxl:
          return xxl;

        default:
          return lg;
      }
    }

    setItem("font-size", changeSize());
    setStyles({ ...styles, fontSize: changeSize() });
  }
}

function toggleSpellchecker(spellCheck: boolean, setSpellCheck: any): void {
  if (location.pathname == PAGES.file) {
    const d = translations();
    setSpellCheck();
    if (spellCheck) notification("error", d.SpellcheckerOff);
    else notification("success", d.SpellcheckerOn);
  }
}

export {
  alignText,
  increaseText,
  reduceText,
  toggleFullScreen,
  toggleSpellchecker,
};

type fnStyles = Dispatch<SetStateAction<StylesText>>;
