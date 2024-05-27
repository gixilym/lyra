import type { Component } from "../utils/types";
import MainContainer from "../components/MainContainer";
import { myFont, myLang, themes } from "../utils/helpers";
import { twMerge } from "tailwind-merge";
import {
  Languages as LanguageIcon,
  CaseSensitive as FontIcon,
} from "lucide-react";
import useStorage from "../hooks/useStorage";
import { LANGS, SELECT_STYLES } from "../utils/consts";
import translations from "../translate/dictionary";
import Select from "react-select";

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
            "text-2xl"
          )}
        >
          {d.Preferences}
        </p>
        <div className="flex justify-between w-full">
          <LanguageIcon size={30} className="ml-1.5" />

          <Select
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
