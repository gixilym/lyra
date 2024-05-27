import {
  toggleSpellchecker,
  centerText,
  reduceText,
  increaseText,
} from "../utils/commands";
import type { Component, StylesText } from "../utils/types";
import { useEffect, useState } from "react";
import { fileStore } from "../store/fileStore";
import { configStore } from "../store/configStore";
import useFile from "../hooks/useFile";
import MainContainer from "../components/MainContainer";
import commands from "mousetrap";
import listenCommands from "bind-mousetrap-global";
import useStorage from "../hooks/useStorage";
import { LANGS } from "../utils/consts";

listenCommands(commands);

function FileContent(): Component {
  const { bindGlobal: listen }: any = commands,
    { getItem } = useStorage(),
    { selectedFile } = fileStore(),
    { spellCheck, setSpellCheck } = configStore(),
    { saveFileContent } = useFile(),
    [content, setContent] = useState<string>(() => selectedFile.content || ""),
    lang = (getItem("language") as string) ?? LANGS.en,
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
          lang={lang}
          className={`${styles.fontSize} ${styles.textCenter} tracking-tight w-full h-full pb-20 text-lg resize-none border-none focus:ring-0 focus:outline-none min-w-[600px] max-w-[800px] bg-transparent`}
          placeholder="..."
        />
      </div>
    </MainContainer>
  );
}

export default FileContent;
