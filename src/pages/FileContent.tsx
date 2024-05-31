import listenCommands from "bind-mousetrap-global";
import commands from "mousetrap";
import { useEffect, useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import MainContainer from "../components/MainContainer";
import useFile from "../hooks/useFile";
import useStorage from "../hooks/useStorage";
import { configStore } from "../store/configStore";
import { fileStore } from "../store/fileStore";
import {
  centerText,
  increaseText,
  reduceText,
  toggleSpellchecker,
} from "../utils/commands";
import translations from "../utils/dictionary";
import {
  copyText,
  getDate,
  myFont,
  myLastModified,
  myWordCount,
} from "../utils/helpers";
import type { Component, StylesText } from "../utils/types";
import { FONTS } from "../utils/consts";

listenCommands(commands);

function FileContent(): Component {
  const d = translations(),
    { getItem, setItem } = useStorage(),
    { selectedFile } = fileStore(),
    { saveFileContent } = useFile(),
    { bindGlobal: listen }: any = commands,
    { spellCheck, setSpellCheck } = configStore(),
    oldContent = selectedFile.content ?? "",
    [content, setContent] = useState<string>(() => selectedFile.content ?? ""),
    fontFamily = myFont(true),
    wordCountIsActive = myWordCount(),
    lastModifiedIsActive = myLastModified(),
    [wordCounts, setWordCounts] = useState<number>(0),
    lastModified = getItem(`${selectedFile.name}-modified`) ?? "",
    [styles, setStyles] = useState<StylesText>({
      fontSize: (getItem("font-size") as string) ?? "text-lg",
      textCenter: (getItem("text-center") as string) ?? "text-start",
      opacity: (getItem("opacity") as string) ?? 1,
    });

  useEffect(() => {
    saveFileContent(selectedFile.name, content ?? "");
    calculateWordCount(content);
    saveLastModified();
  }, [content]);

  listen("ctrl+j", (e: Event) => e.preventDefault());
  listen("ctrl+g", (e: Event) => e.preventDefault());
  listen("ctrl+m", () => toggleSpellchecker(spellCheck, setSpellCheck));
  listen("ctrl+b", () => reduceText(styles, setStyles));
  listen("ctrl+n", () => increaseText(styles, setStyles));
  listen("ctrl+h", () => centerText(styles, setStyles));
  listen("ctrl+a", () => copyText(content));

  function calculateWordCount(text: string): void {
    const separatedNumbers: RegExp = /\s+/;
    const count: number = text
      .trim()
      .split(separatedNumbers)
      .filter((w: string) => w.length > 0).length;
    setWordCounts(count);
  }

  function saveLastModified(): void {
    if (lastModifiedIsActive && oldContent != content) {
      const date: string = getDate();
      setItem(`${selectedFile.name}-modified`, date);
    }
  }

  return (
    <MainContainer>
      <div className="h-[calc(100dvh-6rem)] flex flex-col gap-y-8 items-center justify-center w-[100vw]">
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

        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          spellCheck={spellCheck}
          autoFocus
          placeholder="..."
          style={{ opacity: Number(styles.opacity) / 10 }}
          className={twMerge(
            fontFamily == FONTS[0].value ? "tracking-normal" : "tracking-wide",
            twJoin(
              styles.fontSize,
              styles.textCenter,
              "w-full h-full sm:pb-20 lg:px-0 px-4 resize-none border-none focus:ring-0 focus:outline-none sm:min-w-[600px] max-w-[800px] bg-transparent placeholder:text-gray-100/50"
            )
          )}
        />
      </div>
    </MainContainer>
  );
}

export default FileContent;
