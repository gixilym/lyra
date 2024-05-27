import {
  CaseSensitive as FontIcon,
  Languages as LanguageIcon,
} from "lucide-react";
import Select from "react-select";
import { twMerge } from "tailwind-merge";
import MainContainer from "../components/MainContainer";
import useStorage from "../hooks/useStorage";
import translations from "../utils/dictionary";
import { LANGS, SELECT_STYLES } from "../utils/consts";
import { myFont, myLang, themes } from "../utils/helpers";
import type { Component } from "../utils/types";

function Preferences(): Component {
  const { isSunnyDay } = themes(),
    { setItem } = useStorage(),
    d = translations(),
    font = myFont(),
    lang = myLang(),
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

  return (
    <MainContainer>
      <div className="w-full max-w-[300px] flex flex-col justify-center items-center gap-y-10">
        <p
          className={twMerge(
            isSunnyDay ? "text-black/70" : "text-white",
            "sm:text-2xl text-xl"
          )}
        >
          {d.Preferences}
        </p>
        <div className="flex justify-between w-full">
          <LanguageIcon size={30} className="ml-1.5" />

          <Select
            className="sm:text-lg text-sm"
            isSearchable={false}
            options={langsOptions}
            placeholder={lang}
            onChange={(e: any) => changeLanguage(e.value)}
            styles={SELECT_STYLES}
          />
        </div>
        <div className="flex justify-between w-full">
          <FontIcon size={38} />
          <Select
            className="sm:text-lg text-sm"
            isSearchable={false}
            options={fontsOptions}
            placeholder={font}
            onChange={(e: any) => changeFont(e.value)}
            styles={SELECT_STYLES}
          />
        </div>
      </div>
    </MainContainer>
  );
}

export default Preferences;
