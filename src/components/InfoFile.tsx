import { twMerge } from "tailwind-merge";
import type { Component } from "../utils/types";
import useStorage from "../hooks/useStorage";
import { fileStore } from "../store/fileStore";
import { myLastModified, myWordCount } from "../utils/helpers";
import translations from "../utils/dictionary";

function InfoFile({ wordCounts }: { wordCounts: number }): Component {
  const d = translations(),
    { selectedFile } = fileStore(),
    wordCountIsActive = myWordCount(),
    { getItem } = useStorage(),
    lastModifiedIsActive = myLastModified(),
    lastModified: string = getItem(`${selectedFile.name}-modified`) ?? "";

  return (
    <div
      className={twMerge(
        wordCounts == 0 ? "opacity-0" : "opacity-60",
        "sm:min-w-[600px] w-full max-w-[800px] flex justify-start items-center gap-x-2 sm:text-sm text-xs lg:px-0 px-4 lowercase"
      )}
    >
      {wordCountIsActive && <p>{wordCounts + " " + d.Words}</p>}
      {lastModifiedIsActive && lastModified && (
        <>
          <span>-</span>
          <p>
            {d.Modified}: {lastModified}
          </p>
        </>
      )}
    </div>
  );
}

export default InfoFile;
