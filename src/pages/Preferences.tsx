import {
  CaseSensitive as FontIcon,
  Languages as LanguageIcon,
  Quote as CountIcon,
} from "lucide-react";
import Select from "react-select";
import { twMerge } from "tailwind-merge";
import MainContainer from "../components/MainContainer";
import useStorage from "../hooks/useStorage";
import translations from "../utils/dictionary";
import { LANGS, SELECT_STYLES } from "../utils/consts";
import { myFont, myLang, myWordCount, themes } from "../utils/helpers";
import type { Component } from "../utils/types";

function Preferences(): Component {
  const { isSunnyDay } = themes(),
    { setItem } = useStorage(),
    d = translations(),
    font = myFont(),
    lang = myLang(),
    wordCount = myWordCount(),
    fontsOptions = [
      { value: "font-duo", label: "Monospace" },
      { value: "font-sara", label: "Sarabun" },
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

  return (
    <MainContainer>
      <div className="w-full max-w-[400px] flex flex-col justify-center items-center gap-y-14">
        <p
          className={twMerge(
            isSunnyDay ? "text-black/70" : "text-white",
            "sm:text-2xl text-xl"
          )}
        >
          {d.Preferences}
        </p>
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center items-center gap-x-4">
            <LanguageIcon size={30} />
            <p className="text-lg">{d.Language}</p>
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
          <div className="flex justify-center items-center gap-x-4">
            <FontIcon size={38} />
            <p className="text-lg">{d.Font}</p>
          </div>
          <Select
            className="sm:text-lg text-sm"
            isSearchable={false}
            options={fontsOptions}
            placeholder={font}
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
      </div>
    </MainContainer>
  );
}

export default Preferences;
