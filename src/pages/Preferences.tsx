import {
  CaseSensitive as FontIcon,
  Languages as LanguageIcon,
  Quote as CountIcon,
  Lightbulb as OpacityIcon,
  Calendar as CalendarIcon,
} from "lucide-react";
import Select from "react-select";
import { twMerge } from "tailwind-merge";
import MainContainer from "../components/MainContainer";
import useStorage from "../hooks/useStorage";
import translations from "../utils/dictionary";
import { FONTS, LANGS, SELECT_STYLES } from "../utils/consts";
import {
  myFont,
  myLang,
  myLastModified,
  myWordCount,
  themes,
} from "../utils/helpers";
import type { Component } from "../utils/types";
import { useState } from "react";

function Preferences(): Component {
  const { isSunnyDay } = themes(),
    d = translations(),
    fontFamily = myFont(false),
    lang = myLang(),
    wordCount = myWordCount(),
    { getItem, setItem } = useStorage(),
    lastModifiedIsActive = myLastModified(),
    [textOpacity, setTextOpacity] = useState<number>(
      () => Number(getItem("opacity")) ?? 10
    ),
    fontsOptions = [
      { value: FONTS[0].value, label: FONTS[0].label },
      { value: FONTS[1].value, label: FONTS[1].label },
    ],
    langsOptions = [
      { value: LANGS.en, label: "English" },
      { value: LANGS.es, label: "Español" },
    ];

  function changeLanguage(value: string): void {
    setItem("language", value);
    location.reload();
  }

  function changeFont(value: string): void {
    setItem("font", value);
    location.reload();
  }

  function changeWordCount(): void {
    setItem("word-count", String(!wordCount));
    location.reload();
  }

  function changeOpacity(val: number): void {
    setTextOpacity(val);
    setItem("opacity", String(val));
  }

  function changeLastModified(): void {
    setItem("last-modified", JSON.stringify(!lastModifiedIsActive));
    location.reload();
  }

  return (
    <MainContainer>
      <div className="w-full max-w-[440px] flex flex-col justify-center items-center gap-y-14 mt-6">
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
            styles={SELECT_STYLES}
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
            styles={SELECT_STYLES}
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
              wordCount ? "bg-[#2b2b2b]" : "bg-[#2b2b2b]",
              "cursor-pointer w-[160px] justify-center items-center flex rounded-md text-[#d8d8d8] sm:text-lg text-sm h-10"
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
              lastModifiedIsActive ? "bg-[#2b2b2b]" : "bg-[#2b2b2b]",
              "cursor-pointer w-[160px] justify-center items-center flex rounded-md text-[#d8d8d8] sm:text-lg text-sm h-10"
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
          <div className="flex flex-col justify-start items-center gap-y-2">
            <input
              type="range"
              min={1}
              max={10}
              defaultValue={textOpacity ? (textOpacity * 10) / 10 : 10}
              onChange={e => changeOpacity(Number(e.target.value))}
            />

            <p
              style={{ opacity: textOpacity ? textOpacity / 10 : 10 }}
              className={twMerge(
                isSunnyDay ? "text-black" : "text-white",
                "sm:text-md text-sm"
              )}
            >
              {d.TestText}
            </p>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default Preferences;
