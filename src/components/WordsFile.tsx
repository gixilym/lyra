import { twMerge } from "tailwind-merge";
import usePreferences from "../hooks/usePreferences";
import { configStore } from "../store/configStore";
import { PAGES } from "../utils/consts";
import translations from "../utils/dictionary";
import { pathIs } from "../utils/helpers";
import type { Component } from "../utils/types";

function WordsFile({ wordCounts }: { wordCounts: number }): Component {
  const d = translations(),
    { showHeader } = configStore(),
    { myWordCount } = usePreferences(),
    showCount: boolean = showHeader && wordCounts != 0;

  return (
    <div
      className={twMerge(
        showCount ? "opacity-65" : "opacity-0",
        pathIs(PAGES.preferences) ? "justify-start" : "justify-center",
        "flex items-center gap-x-2 z-50 sm:text-sm text-xs w-[200px] h-[34px] lowercase fixed inset-0 left-96 md:left-0 md:mx-auto pointer-events-none"
      )}
    >
      {myWordCount() && <p>{wordCounts + " " + d.Words}</p>}
    </div>
  );
}

export default WordsFile;
