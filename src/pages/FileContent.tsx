import listenCommands from "bind-mousetrap-global";
import commands from "mousetrap";
import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";
import MainContainer from "../components/MainContainer";
import ModifiedFile from "../components/ModifiedFile";
import WordsFile from "../components/WordsFile";
import useFile from "../hooks/useFile";
import usePreferences from "../hooks/usePreferences";
import useStorage from "../hooks/useStorage";
import { configStore } from "../store/configStore";
import { fileStore } from "../store/fileStore";
import {
  alignText,
  increaseText,
  reduceText,
  toggleSpellchecker,
} from "../utils/commands";
import { copyText, getDate } from "../utils/helpers";
import type { Component, stylesText } from "../utils/types";

listenCommands(commands);

function FileContent(): Component {
  const { setItem } = useStorage(),
    { selectedFile } = fileStore(),
    { saveFileContent } = useFile(),
    { bindGlobal: listen }: any = commands,
    { spellCheck, setSpellCheck } = configStore(),
    oldContent: string = selectedFile.content ?? "",
    [content, setContent] = useState<string>(() => selectedFile.content ?? ""),
    { myLastModified, myFontSize, myAlign, myOpacity, mySpacing } =
      usePreferences(),
    [wordCounts, setWordCounts] = useState<number>(0),
    [styles, setStyles] = useState<stylesText>({
      fontSize: myFontSize(),
      alignText: myAlign(),
      opacity: String(myOpacity()),
      letterSpacing: String(mySpacing()),
    });

  useEffect(() => {
    saveFileContent(selectedFile.name, content ?? "");
    calculateWordCount(content);
    saveLastModified();
  }, [content]);

  listen("ctrl+j", (e: Event) => e.preventDefault());
  listen("ctrl+g", (e: Event) => e.preventDefault());
  listen("ctrl+m", () => toggleSpellchecker(spellCheck, setSpellCheck));
  listen("ctrl+a", () => copyText(content));
  listen("ctrl+b", () => reduceText(styles, setStyles));
  listen("ctrl+n", () => increaseText(styles, setStyles));
  listen("ctrl+h", () => alignText(styles, setStyles));

  function calculateWordCount(text: string): void {
    const spaces: RegExp = /\s+/;
    const count: number = text
      .trim()
      .split(spaces)
      .filter((w: string) => w.length > 0).length;
    setWordCounts(count);
  }

  function saveLastModified(): void {
    if (myLastModified() && oldContent != content) {
      const date: string = getDate();
      setItem(`${selectedFile.name}-modified`, date);
    }
  }

  return (
    <MainContainer>
      <WordsFile wordCounts={wordCounts} />
      <ModifiedFile />
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
          "sm:min-w-[600px] w-full min-h-screen py-6 sm:py-20 px-4 lg:px-44 xl:px-64 resize-none border-none focus:ring-0 focus:outline-none bg-transparent placeholder:text-gray-100/50 text-pretty"
        )}
      />
    </MainContainer>
  );
}
export default FileContent;
