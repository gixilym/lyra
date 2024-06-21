import { twMerge } from "tailwind-merge";
import type { Component } from "../utils/types";
import useStorage from "../hooks/useStorage";
import { fileStore } from "../store/fileStore";
import { getDate, myLastModified, myWordCount } from "../utils/helpers";
import translations from "../utils/dictionary";

function InfoFile({
  wordCounts,
  isPreferences,
}: {
  wordCounts: number;
  isPreferences?: boolean;
}): Component {
  const d = translations(),
    { selectedFile } = fileStore(),
    wordCountIsActive = myWordCount(),
    { getItem } = useStorage(),
    lastModifiedIsActive = myLastModified(),
    lastModified: string = getItem(`${selectedFile.name}-modified`) ?? "",
    currentDate = getDate();

  return (
    <div
      className={twMerge(
        wordCounts == 0 ? "opacity-0" : "opacity-60",
        location.pathname == "/preferences" ? "px-0" : "lg:px-0 px-4",
        "sm:min-w-[600px] w-full max-w-[800px] flex justify-start items-center gap-x-2 sm:text-sm text-xs lowercase"
      )}
    >
      {wordCountIsActive && <p>{wordCounts + " " + d.Words}</p>}

      {isPreferences && (
        <>
          {wordCountIsActive && <span>-</span>}
          <p>
            {d.Modified}: {currentDate}
          </p>
        </>
      )}

      {lastModifiedIsActive && lastModified && (
        <>
          {wordCountIsActive && <span>-</span>}
          <p>
            {d.Modified}: {lastModified}
          </p>
        </>
      )}
    </div>
  );
}

export default InfoFile;
