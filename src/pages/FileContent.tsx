import type { Component, StylesText } from "../utils/types";
import { useEffect, useState } from "react";
import { fileStore } from "../store/fileStore";
import { configStore } from "../store/configStore";
import useFile from "../hooks/useFile";
import MainContainer from "../components/MainContainer";
import mousetrap from "mousetrap";
import addGlobalBinds from "bind-mousetrap-global";
import useStorage from "../hooks/useStorage";
import "@fontsource/ia-writer-duo";
import { LANGS } from "../utils/consts";
import {
  toggleSpellchecker,
  centerText,
  reduceText,
  increaseText,
} from "../utils/commands";

addGlobalBinds(mousetrap);

function FileContent(): Component {
  const CommandListener: any = mousetrap,
    { getItem } = useStorage(),
    { selectedFile } = fileStore(),
    { spellCheck } = configStore(),
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

  CommandListener.bindGlobal("ctrl+j", (e: Event) => e.preventDefault());
  CommandListener.bindGlobal("ctrl+g", (e: Event) => e.preventDefault());
  CommandListener.bindGlobal("ctrl+m", () => toggleSpellchecker());
  CommandListener.bindGlobal("ctrl+b", () => reduceText(styles, setStyles));
  CommandListener.bindGlobal("ctrl+n", () => increaseText(styles, setStyles));
  CommandListener.bindGlobal("ctrl+h", () => centerText(styles, setStyles));

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
