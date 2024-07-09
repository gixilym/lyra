import { appWindow } from "@tauri-apps/api/window";
import type { Dispatch, SetStateAction } from "react";
import useStorage from "../hooks/useStorage";
import translations from "./dictionary";
import { notification, pathIs } from "./helpers";
import type { stylesText } from "./types";
import { PAGES, TEXT_ALIGNS, TEXT_SIZES } from "./consts";
import usePreferences from "../hooks/usePreferences";

async function toggleFullScreen(): Promise<void> {
  const isFullScreen: boolean = await appWindow.isFullscreen();
  if (isFullScreen) appWindow.setFullscreen(false);
  else appWindow.setFullscreen(true);
}

function alignText(styles: stylesText, setStyles: fnStyles): void {
  if (pathIs(PAGES.file)) {
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

function increaseText(styles: stylesText, setStyles: fnStyles): void {
  if (pathIs(PAGES.file)) {
    const { setItem } = useStorage();
    const { myFontSize } = usePreferences();
    const { sm, md, lg, xl, xxl, xxxl } = TEXT_SIZES;

    function changeSize(): string {
      switch (myFontSize()) {
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

function reduceText(styles: stylesText, setStyles: fnStyles): void {
  if (pathIs(PAGES.file)) {
    const { setItem } = useStorage();
    const { myFontSize } = usePreferences();
    const { sm, md, lg, xl, xxl, xxxl } = TEXT_SIZES;

    function changeSize(): string {
      switch (myFontSize()) {
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
  if (pathIs(PAGES.file)) {
    const d = translations();
    if (spellCheck) {
      notification("error", d.SpellcheckerOff);
      setSpellCheck(false);
    } else {
      notification("success", d.SpellcheckerOn);
      setSpellCheck(true);
    }
  }
}

export {
  alignText,
  increaseText,
  reduceText,
  toggleFullScreen,
  toggleSpellchecker,
};

type fnStyles = Dispatch<SetStateAction<stylesText>>;
