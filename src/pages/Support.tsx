import { Copy as CopyIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import MainContainer from "../components/MainContainer";
import translations from "../utils/dictionary";
import { copyText, themes } from "../utils/helpers";
import type { Component } from "../utils/types";

function Support(): Component {
  const { isDay } = themes();
  const d = translations();

  return (
    <MainContainer>
      <div className="px-8 md:px-0 flex flex-col justify-center items-center w-full max-w-[700px] gap-y-10 text-pretty">
        <div className="flex flex-col justify-center items-start gap-y-4">
          <p className="text-lg border-b border-gray-600/80 w-full">
            {d.Suggestions}
          </p>
          <p
            className={twMerge(
              isDay ? "text-black/90" : "text-gray-200",
              "text-md"
            )}>
            {d.SuggestionsText}
          </p>
        </div>
        <div className="flex flex-col justify-center items-start gap-y-4">
          <p className="text-lg border-b border-gray-600/80 w-full">
            {d.Errors}
          </p>
          <p
            className={twMerge(
              isDay ? "text-black/90" : "text-gray-200",
              "text-md"
            )}>
            {d.ErrorsText}
          </p>
        </div>
      </div>
      <div className="px-8 md:px-0 flex gap-x-4 w-full max-w-[700px] items-center justify-end mb-14 sm:mb-0">
        <address
          className={twMerge(
            isDay ? "text-blue-800" : "text-blue-300",
            "sm:text-xl text-lg underline font-sara tracking-wider"
          )}>
          gixi.tsx@gmail.com
        </address>
        <CopyIcon
          onClick={() => copyText("gixi.tsx@gmail.com")}
          size={30}
          color={isDay ? "#222222" : "#c0c0c0"}
          className="hover:scale-125 cursor-pointer duration-100"
        />
      </div>
    </MainContainer>
  );
}

export default Support;
