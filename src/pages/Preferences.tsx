import {
  AlignLeft as AlignIcon,
  Sparkles as AnimationsIcon,
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
import { twJoin, twMerge } from "tailwind-merge";
import WordsFile from "../components/WordsFile";
import MainContainer from "../components/MainContainer";
import usePreferences from "../hooks/usePreferences";
import useStorage from "../hooks/useStorage";
import { LANGS } from "../utils/consts";
import translations from "../utils/dictionary";
import { reload, stylesSelect, themes } from "../utils/helpers";
import type { Component } from "../utils/types";

const d = translations(),
  fontsOptions: Options[] = [
    { value: "font-duo", label: "Monospace" },
    { value: "font-sara", label: "Sarabun" },
    { value: "font-cursive", label: "Cursive" },
    { value: "font-revert", label: "Revert" },
    { value: "font-serif", label: "Sans serif" },
  ] as const,
  langsOptions: Options[] = [
    { value: LANGS.en, label: "English" },
    { value: LANGS.es, label: "Español" },
  ] as const,
  alignsOptions: Options[] = [
    { value: "start", label: d.Left },
    { value: "center", label: d.Centered },
    { value: "end", label: d.Right },
  ] as const;

function Preferences(): Component {
  const { isSunnyDay } = themes(),
    {
      myLastModified,
      myAnimations,
      myLangLabel,
      myLangValue,
      myFontLabel,
      myAlign,
      myWordCount,
      mySpacing,
      myOpacity,
      myMsgDisplayed,
      myPaper,
    } = usePreferences(),
    { setItem, clearEverything } = useStorage(),
    [opacity, setOpacity] = useState<number>(myOpacity()),
    [spacing, setSpacing] = useState<number>(mySpacing());

  function getAlignLabel(): string {
    switch (myAlign()) {
      case "start":
        return d.Left;
      case "center":
        return d.Centered;
      case "end":
        return d.Right;
      default:
        return d.Left;
    }
  }

  function changeLanguage(value: string): void {
    setItem("language", value);
    reload();
  }

  function changeFont(value: string): void {
    setItem("font", value);
    reload();
  }

  function changeWordCount(): void {
    setItem("word-count", String(!myWordCount()));
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
    setItem("last-modified", String(!myLastModified()));
    reload();
  }

  function resetPreferences(): void {
    const paper: string = String(myPaper());
    clearEverything();
    setItem("language", myLangValue());
    setItem("list-msg", myMsgDisplayed());
    setItem("paper", paper);
    reload();
  }

  function changeAlign(val: string): void {
    setItem("align-text", val);
    reload();
  }

  function toggleAnimations(): void {
    setItem("animations", String(!myAnimations()));
    reload();
  }

  return (
    <MainContainer>
      <div className="flex-col lg:flex-row mb-14 flex justify-center items-center overflow-x-hidden lg:items-start w-6/6 lg:px-10 lg:gap-x-6 gap-y-20">
        <div className="w-full px-6 md:px-0 lg:w-3/6 lg:max-w-[420px] flex flex-col justify-center items-center gap-y-14">
          <div className=" flex justify-between items-center w-full">
            <div className="flex justify-center items-center gap-x-4">
              <LanguageIcon size={30} />
              <p className="text-md">{d.Language}</p>
            </div>
            <Select
              className="sm:text-lg text-sm"
              isSearchable={false}
              options={langsOptions}
              placeholder={myLangLabel()}
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
              placeholder={myFontLabel()}
              onChange={(e: any) => changeFont(e.value)}
              styles={stylesSelect()}
            />
          </div>

          <div className="flex justify-between items-center w-full">
            <div className="flex justify-center items-center gap-x-5">
              <AnimationsIcon size={25} />
              <p className="text-md">{d.Animations}</p>
            </div>
            <button
              onClick={toggleAnimations}
              className={twMerge(
                isSunnyDay
                  ? "bg-[#c0c0c0] text-black border-[#2b2b2b]"
                  : "bg-[#2b2b2b] text-[#d8d8d8] border-[#c0c0c0]",
                "cursor-pointer w-[140px] md:w-[160px] justify-center items-center flex rounded-md border sm:text-lg text-sm h-10"
              )}
            >
              {myAnimations() ? d.Enabled : d.Disabled}
            </button>
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
              {myWordCount() ? d.Enabled : d.Disabled}
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
              {myLastModified() ? d.Enabled : d.Disabled}
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
            <div className="flex justify-center items-center gap-x-3">
              <AlignIcon size={25} />
              <p className="text-md">{d.Aligment}</p>
            </div>
            <Select
              className="sm:text-lg text-sm"
              isSearchable={false}
              options={alignsOptions}
              placeholder={getAlignLabel()}
              onChange={(e: any) => changeAlign(e.value)}
              styles={stylesSelect()}
            />
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
                className="w-full h-full outline-0 border-0 text-center bg-transparent"
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
        <div className="w-full lg:w-3/6 flex flex-col justify-start gap-y-4 items-start">
          <p className="text-start w-full text-pretty pl-4">
            {d.RememberToUseKeyboardShortcuts} -&gt; <i>{d.Commands}</i>.
          </p>
          <div className="w-full flex flex-col justify-start gap-y-4 items-start px-4 bg-transparent pt-2 pb-4  h-full max-h-[515px] overflow-hidden">
            <WordsFile
              wordCounts={myLangLabel() == langsOptions[1].label ? 65 : 68}
            />
            <p
              className={twJoin(myAlign(), "text-lg font-semibold w-full")}
              style={{
                letterSpacing: spacing + "px",
                opacity: opacity ? opacity / 10 : 10,
              }}
            >
              {d.TestText}
            </p>

            <textarea
              readOnly
              value={d.TestParagraph}
              className={twJoin(
                myAlign(),
                "text-lg w-full bg-transparent outline-0 resize-none min-h-[320px] max-h-[400px] overflow-hidden"
              )}
              style={{
                letterSpacing: spacing + "px",
                opacity: opacity ? opacity / 10 : 10,
              }}
            />
          </div>
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
