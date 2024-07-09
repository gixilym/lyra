import { twMerge } from "tailwind-merge";
import useStorage from "../hooks/useStorage";
import { fileStore } from "../store/fileStore";
import { PAGES } from "../utils/consts";
import translations from "../utils/dictionary";
import { getDate, pathIs } from "../utils/helpers";
import type { Component } from "../utils/types";
import usePreferences from "../hooks/usePreferences";

function InfoFile({ wordCounts, isPreferences }: Props): Component {
  const d = translations(),
    { getItem } = useStorage(),
    { selectedFile } = fileStore(),
    currentDate: string = getDate(),
    { myLastModified, myWordCount } = usePreferences(),
    lastModified: string = getItem(`${selectedFile.name}-modified`, "");

  return (
    <div
      className={twMerge(
        wordCounts == 0 ? "opacity-0" : "opacity-60",
        pathIs(PAGES.preferences) ? "justify-start" : "justify-center",
        "sm:min-w-[600px] w-full max-w-[800px] flex items-center gap-x-2 sm:text-sm text-xs lowercase"
      )}
    >
      {myWordCount() && <p>{wordCounts + " " + d.Words}</p>}

      {isPreferences && (
        <>
          {myWordCount() && <span>-</span>}
          <p>
            {d.Modified}: {currentDate}
          </p>
        </>
      )}

      {myLastModified() && lastModified && !isPreferences && (
        <>
          {myWordCount() && <span>-</span>}
          <p>
            {d.Modified}: {lastModified}
          </p>
        </>
      )}
    </div>
  );
}

export default InfoFile;

interface Props {
  wordCounts: number;
  isPreferences?: boolean;
}
