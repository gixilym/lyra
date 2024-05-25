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
    [styles, setStyles] = useState<Styles>({
      fontSize: getItem("font-size") ?? "text-lg",
      textCenter: getItem("text-center") ?? "text-start",
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
      <div className="h-full flex justify-center items-center w-full min-w-[600px] max-w-[800px] bg-transparent">
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          spellCheck={spellCheck}
          className={`${styles.fontSize} ${styles.textCenter} pb-20 font-duo w-full bg-transparent min-h-screen outline-none resize-none tracking-tight`}
          autoFocus
          lang="es"
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
