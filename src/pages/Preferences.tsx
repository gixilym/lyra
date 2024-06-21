import {
  Calendar as CalendarIcon,
  Quote as CountIcon,
  CaseSensitive as FontIcon,
  Languages as LanguageIcon,
  Lightbulb as OpacityIcon,
  RotateCcw as ResetIcon,
  Space as SpacingIcon,
} from "lucide-react";
import { useState } from "react";
import Select from "react-select";
import { twMerge } from "tailwind-merge";
import InfoFile from "../components/InfoFile";
import MainContainer from "../components/MainContainer";
import useStorage from "../hooks/useStorage";
import { LANGS } from "../utils/consts";
import translations from "../utils/dictionary";
import {
  myFontLabel,
  myLang,
  myLastModified,
  myWordCount,
  paperFiles,
  stylesSelect,
  themes,
} from "../utils/helpers";
import type { Component } from "../utils/types";

const fontsOptions: Options[] = [
  { value: "font-duo", label: "Monospace" },
  { value: "font-sara", label: "Sarabun" },
  { value: "font-cursive", label: "Cursive" },
  { value: "font-revert", label: "Revert" },
  { value: "font-serif", label: "Sans serif" },
] as const;

const langsOptions: Options[] = [
  { value: LANGS.en, label: "English" },
  { value: LANGS.es, label: "Español" },
] as const;

function Preferences(): Component {
  const d = translations(),
    lang = myLang(),
    fontFamily = myFontLabel(),
    wordCount = myWordCount(),
    lastModifiedIsActive = myLastModified(),
    { isSunnyDay } = themes(),
    { getItem, setItem, clearEverything } = useStorage(),
    reload = (): void => window.location.reload(),
    getOpacity = (): number => Number(getItem("opacity")) ?? 10,
    getSpacing = (): number => Number(getItem("spacing")) ?? 0,
    [opacity, setOpacity] = useState<number>(getOpacity()),
    [spacing, setSpacing] = useState<number>(getSpacing());

  function changeLanguage(value: string): void {
    setItem("language", value);
    reload();
  }

  function changeFont(value: string): void {
    setItem("font", value);
    reload();
  }

  function changeWordCount(): void {
    setItem("word-count", String(!wordCount));
    reload();
  }

  function changeOpacity(val: number): void {
    setOpacity(val);
    setItem("opacity", String(val));
  }

  function changeSpacing(val: number): void {
    setSpacing(val);
    setItem("spacing", String(val));
  }

  function changeLastModified(): void {
    setItem("last-modified", JSON.stringify(!lastModifiedIsActive));
    reload();
  }

  function resetPreferences(): void {
    const lang: string = getItem("language") ?? LANGS.en;
    const msgDisplayed: string = getItem("list-msg") ?? "false";
    const paper: string = JSON.stringify(paperFiles());
    clearEverything();
    setItem("language", lang);
    setItem("list-msg", msgDisplayed);
    setItem("paper", paper);
    reload();
  }

  return (
    <MainContainer>
      <div className="flex-col lg:flex-row mt-6 mb-14 flex justify-center items-center overflow-x-hidden lg:items-start w-6/6 lg:px-10 lg:gap-x-6 gap-y-20">
        <div className="w-3/6 lg:max-w-[420px] flex flex-col justify-center items-center gap-y-14 ">
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-center items-center gap-x-4">
              <LanguageIcon size={30} />
              <p className="text-md">{d.Language}</p>
            </div>

            <Select
              className="sm:text-lg text-sm "
              isSearchable={false}
              options={langsOptions}
              placeholder={lang}
              onChange={(e: any) => changeLanguage(e.value)}
              styles={stylesSelect()}
            />
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-center items-center gap-x-3">
              <FontIcon size={38} />
              <p className="text-md">{d.Font}</p>
            </div>
            <Select
              className="sm:text-lg text-sm"
              isSearchable={false}
              options={fontsOptions}
              placeholder={fontFamily}
              onChange={(e: any) => changeFont(e.value)}
              styles={stylesSelect()}
            />
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-center items-center gap-x-5">
              <CountIcon size={25} />
              <p className="text-md">{d.WordCount}</p>
            </div>
            <button
              onClick={changeWordCount}
              className={twMerge(
                isSunnyDay
                  ? "bg-[#c0c0c0] text-black border-[#2b2b2b]"
                  : "bg-[#2b2b2b] text-[#d8d8d8] border-[#c0c0c0]",
                "cursor-pointer w-[140px] md:w-[160px] justify-center items-center flex rounded-md border sm:text-lg text-sm h-10"
              )}
            >
              {wordCount ? d.Enabled : d.Disabled}
            </button>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-center items-center gap-x-5">
              <CalendarIcon size={25} />
              <p className="text-md">{d.LastModified}</p>
            </div>
            <button
              onClick={changeLastModified}
              className={twMerge(
                isSunnyDay
                  ? "bg-[#c0c0c0] text-black border-[#2b2b2b]"
                  : "bg-[#2b2b2b] text-[#d8d8d8] border-[#c0c0c0]",
                "cursor-pointer w-[140px] sm:w-[160px] justify-center items-center flex rounded-md sm:text-lg text-sm h-10 border"
              )}
            >
              {lastModifiedIsActive ? d.Enabled : d.Disabled}
            </button>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-center items-center gap-x-4">
              <OpacityIcon size={28} />
              <p className="text-md">{d.TextOpacity}</p>
            </div>
            <div
              className={twMerge(
                isSunnyDay
                  ? "border-[#2b2b2b]"
                  : "border-[#c0c0c0] bg-[#2b2b2b]",
                "flex flex-col justify-center py-0.5 items-center border w-[140px] sm:w-[160px] rounded-md h-10 "
              )}
            >
              <input
                type="range"
                min={1}
                max={10}
                defaultValue={opacity ? (opacity * 10) / 10 : 10}
                onChange={e => changeOpacity(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-center items-center gap-x-4">
              <SpacingIcon size={28} />
              <p className="text-md">{d.LetterSpacing}</p>
            </div>
            <div
              className={twMerge(
                isSunnyDay
                  ? "border-[#2b2b2b]"
                  : "border-[#c0c0c0] bg-[#2b2b2b]",
                "flex flex-col justify-center py-0.5 items-center border w-[140px] sm:w-[160px] rounded-md h-10"
              )}
            >
              <input
                type="number"
                value={spacing}
                className="w-full h-full outline-0 border-0 text-center text-white bg-transparent"
                min={0}
                max={10}
                onChange={e => changeSpacing(Number(e.target.value))}
              />
            </div>
          </div>

          <div
            onClick={resetPreferences}
            className="flex items-start justify-start gap-x-4 w-full bg-transparent cursor-pointer opacity-65 hover:opacity-100 duration-75"
          >
            <ResetIcon size={23} />
            <p className="text-md lowercase">{d.ResetPreferences}</p>
          </div>
        </div>
        <div className="w-3/6 flex flex-col justify-start gap-y-4 items-start px-4 bg-transparent  border border-l-0 border-r-0 pt-2 pb-4  h-full max-h-[515px] overflow-hidden">
          <InfoFile wordCounts={65} isPreferences={lastModifiedIsActive} />
          <p
            className="text-lg font-semibold"
            style={{
              letterSpacing: spacing + "px",
              opacity: opacity ? opacity / 10 : 10,
            }}
          >
            {d.TestText}
          </p>

          <p
            className="text-lg"
            style={{
              letterSpacing: spacing + "px",
              opacity: opacity ? opacity / 10 : 10,
            }}
          >
            {d.TestParagraph}
          </p>
        </div>
      </div>
    </MainContainer>
  );
}

export default Preferences;

type Options = {
  readonly value: string;
  readonly label: string;
};
