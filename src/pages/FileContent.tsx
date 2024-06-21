import listenCommands from "bind-mousetrap-global";
import commands from "mousetrap";
import { lazy, Suspense, useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";
import MainContainer from "../components/MainContainer";
import useFile from "../hooks/useFile";
import useStorage from "../hooks/useStorage";
import { configStore } from "../store/configStore";
import { fileStore } from "../store/fileStore";
import {
  alignText,
  increaseText,
  reduceText,
  toggleSpellchecker,
} from "../utils/commands";
import { DEFAULT_OPACITY, TEXT_ALIGNS, TEXT_SIZES } from "../utils/consts";
import { copyText, getDate, myLastModified } from "../utils/helpers";
import type { Component, LazyCmp, StylesText } from "../utils/types";

listenCommands(commands);

const LazyInfoFile: LazyCmp = lazy(() => import("../components/InfoFile"));

function FileContent(): Component {
  const { getItem, setItem } = useStorage(),
    { selectedFile } = fileStore(),
    { saveFileContent } = useFile(),
    { bindGlobal: listen }: any = commands,
    { spellCheck, setSpellCheck } = configStore(),
    oldContent: string = selectedFile.content ?? "",
    [content, setContent] = useState<string>(() => selectedFile.content ?? ""),
    lastModifiedIsActive = myLastModified(),
    [wordCounts, setWordCounts] = useState<number>(0),
    [styles, setStyles] = useState<StylesText>({
      fontSize: getItem("font-size") ?? TEXT_SIZES.lg,
      alignText: getItem("align-text") ?? TEXT_ALIGNS.start,
      opacity: getItem("opacity") ?? DEFAULT_OPACITY,
      letterSpacing: getItem("spacing") ?? "0",
    });

  document
    .querySelector("textarea")
    ?.addEventListener("contextmenu", e => e.stopPropagation());

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
  listen("ctrl+h", () => alignText(styles, setStyles));
  listen("ctrl+a", () => copyText(content));

  function calculateWordCount(text: string): void {
    const spaces: RegExp = /\s+/;
    const count: number = text
      .trim()
      .split(spaces)
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
        <Suspense fallback={null}>
          <LazyInfoFile wordCounts={wordCounts} />
        </Suspense>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          spellCheck={spellCheck}
          autoFocus
          placeholder="..."
          style={{
            opacity: Number(styles.opacity) / 10,
            letterSpacing: `${styles.letterSpacing}px`,
          }}
          className={twJoin(
            styles.fontSize,
            styles.alignText,
            "w-full h-full sm:pb-20 lg:px-0 px-4 resize-none border-none focus:ring-0 focus:outline-none sm:min-w-[600px] max-w-[800px] bg-transparent placeholder:text-gray-100/50"
          )}
        />
      </div>
    </MainContainer>
  );
}
export default FileContent;
