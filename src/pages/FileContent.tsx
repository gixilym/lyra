import type { Component } from "../utils/types";
import { useEffect, useState } from "react";
import { fileStore } from "../store/fileStore";
import { configStore } from "../store/configStore";
import useFile from "../hooks/useFile";
import MainContainer from "../components/MainContainer";
import { notification } from "../utils/helpers";
import mousetrap from "mousetrap";
import addGlobalBinds from "bind-mousetrap-global";
import useStorage from "../hooks/useStorage";
import "@fontsource/ia-writer-duo";

addGlobalBinds(mousetrap);

function FileContent(): Component {
  const CommandListener: any = mousetrap,
    { setItem, getItem } = useStorage(),
    { selectedFile } = fileStore(),
    { spellCheck, setSpellCheck } = configStore(),
    { saveFileContent } = useFile(),
    [content, setContent] = useState<string>(() => selectedFile.content || ""),
    lang = (getItem("language") as string) ?? "EN",
    [styles, setStyles] = useState<Styles>({
      fontSize: (getItem("font-size") as string) ?? "text-lg",
      textCenter: (getItem("text-center") as string) ?? "text-start",
    });

  useEffect(() => {
    saveFileContent(selectedFile.name, content);
  }, [content]);

  CommandListener.bindGlobal("ctrl+j", (e: Event) => e.preventDefault());
  CommandListener.bindGlobal("ctrl+g", (e: Event) => e.preventDefault());
  CommandListener.bindGlobal("ctrl+m", () => ctrlM());
  CommandListener.bindGlobal("ctrl+b", () => ctrlB());
  CommandListener.bindGlobal("ctrl+n", () => ctrlN());
  CommandListener.bindGlobal("ctrl+h", () => ctrlH());

  function ctrlH(): void {
    const textMode: string =
      styles.textCenter == "text-center" ? "text-start" : "text-center";
    const msg: string =
      textMode == "text-center" ? "Texto centrado" : "Texto normal";
    notification("success", msg);
    setItem("text-center", textMode);
    setStyles({ ...styles, textCenter: textMode });
  }

  function ctrlN(): void {
    setItem("font-size", "text-xl");
    setStyles({ ...styles, fontSize: "text-xl" });
  }

  function ctrlB(): void {
    setItem("font-size", "text-lg");
    setStyles({ ...styles, fontSize: "text-lg" });
  }

  function ctrlM(): void {
    if (spellCheck) {
      setSpellCheck();
      return notification("error", "Corrector ortográfico desactivado");
    } else {
      setSpellCheck();
      return notification("success", "Corrector ortográfico activado");
    }
  }

  return (
    <MainContainer>
      <div className="h-[calc(100dvh-6rem)] flex items-center justify-center w-[100vw]">
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          spellCheck={spellCheck}
          autoFocus
          lang={lang}
          className={`${styles.fontSize} ${styles.textCenter} font-duo tracking-tight w-full h-full pb-20 text-lg resize-none border-none focus:ring-0 focus:outline-none min-w-[600px] max-w-[800px] bg-transparent`}
          placeholder="..."
        />
      </div>
    </MainContainer>
  );
}

export default FileContent;

interface Styles {
  fontSize: string;
  textCenter: string;
}
