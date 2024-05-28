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
import { FONTS } from "../utils/consts";
import type { Component, StylesText } from "../utils/types";

listenCommands(commands);

function FileContent(): Component {
  const { bindGlobal: listen }: any = commands,
    { getItem } = useStorage(),
    { selectedFile } = fileStore(),
    { spellCheck, setSpellCheck } = configStore(),
    { saveFileContent } = useFile(),
    [content, setContent] = useState<string>(() => selectedFile.content || ""),
    fontFamily = getItem("font") ?? FONTS[0].value,
    [styles, setStyles] = useState<StylesText>({
      fontSize: (getItem("font-size") as string) ?? "text-lg",
      textCenter: (getItem("text-center") as string) ?? "text-start",
    });

  useEffect(() => {
    saveFileContent(selectedFile.name, content);
  }, [content]);

  listen("ctrl+j", (e: Event) => e.preventDefault());
  listen("ctrl+g", (e: Event) => e.preventDefault());
  listen("ctrl+m", () => toggleSpellchecker(spellCheck, setSpellCheck));
  listen("ctrl+b", () => reduceText(styles, setStyles));
  listen("ctrl+n", () => increaseText(styles, setStyles));
  listen("ctrl+h", () => centerText(styles, setStyles));

  return (
    <MainContainer>
      <div className="h-[calc(100dvh-6rem)] flex items-center justify-center w-[100vw]">
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          spellCheck={spellCheck}
          autoFocus
          placeholder="..."
          className={twMerge(
            fontFamily == "font-duo" ? " tracking-normal" : "tracking-wide",
            twJoin(
              styles.fontSize,
              styles.textCenter,
              "$w-full h-full sm:pb-20 lg:px-0 px-4 text-lg resize-none border-none focus:ring-0 focus:outline-none sm:min-w-[600px] max-w-[800px] bg-transparent"
            )
          )}
        />
      </div>
    </MainContainer>
  );
}

export default FileContent;
