import type { Component, SelectEvent } from "../utils/types";
import MainContainer from "../components/MainContainer";
import { themes } from "../utils/helpers";
import { twMerge } from "tailwind-merge";
import { Languages as LanguageIcon } from "lucide-react";
import useStorage from "../hooks/useStorage";

function Preferences(): Component {
  const { isSunnyDay } = themes();
  const { setItem } = useStorage();

  function changeLanguage(event: SelectEvent): void {
    const value: string = event.target.value;
    setItem("language", value);
    location.reload();
  }

  return (
    <MainContainer>
      <div className="w-full max-w-[180px] flex flex-col justify-center items-center gap-y-10">
        <p
          className={twMerge(
            isSunnyDay ? "text-black/70" : "text-white",
            "text-2xl"
          )}
        >
          Preferencias
        </p>
        <div className="flex justify-between w-full">
          <LanguageIcon />
          <select
            defaultValue="default"
            className="bg-transparent [&>option]:bg-gray-900 text-lg outline-0 border-0"
            onChange={changeLanguage}
          >
            <option value="default" disabled>
              Idioma
            </option>
            <option value="EN">English</option>
            <option value="ES">Español</option>
          </select>
        </div>
      </div>
    </MainContainer>
  );
}

export default Preferences;
