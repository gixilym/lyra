import type { Component } from "../utils/types";
import { useEffect, useState } from "react";
import { fileStore } from "../store/fileStore";
import { configStore } from "../store/configStore";
import useFile from "../hooks/useFile";
import MainContainer from "../components/MainContainer";
import { notification } from "../utils/helpers";
import mousetrap from "mousetrap";
import addGlobalBinds from "bind-mousetrap-global";
import "@fontsource/ia-writer-duo";
import { twMerge } from "tailwind-merge";

addGlobalBinds(mousetrap);

function FileContent(): Component {
  const CommandListener: any = mousetrap,
    { selectedFile } = fileStore(),
    { spellCheck, setSpellCheck } = configStore(),
    { saveFileContent } = useFile(),
    [content, setContent] = useState<string>(selectedFile.content || ""),
    size: string = localStorage.getItem("font-size") ?? "text-lg",
    [fontSize, setFontSize] = useState<string>(size);

  CommandListener.bindGlobal("ctrl+j", (e: Event) => e.preventDefault());
  CommandListener.bindGlobal("ctrl+g", (e: Event) => e.preventDefault());
  CommandListener.bindGlobal("ctrl+m", () => activateSpelling());
  CommandListener.bindGlobal("ctrl+b", () => {
    setFontSize("text-lg");
    localStorage.setItem("font-size", "text-lg");
  });
  CommandListener.bindGlobal("ctrl+n", () => {
    setFontSize("text-xl");
    localStorage.setItem("font-size", "text-xl");
  });

  useEffect(() => {
    saveFileContent(selectedFile.name, content);
  }, [content]);

  function activateSpelling(): void {
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
          autoFocus
          lang="es"
          className={twMerge(
            fontSize,
            "pb-20 font-duo text-center w-full bg-transparent min-h-screen outline-none resize-none text-gray-200/90 tracking-tight"
          )}
        />
      </div>
    </MainContainer>
  );
}

export default FileContent;

{
  /* <div className="h-full flex justify-center items-center w-full min-w-[600px] max-w-[800px] bg-transparent">
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          spellCheck={spellCheck}
          autoFocus
          lang="es"
          className="font-duo text-center w-full bg-transparent min-h-screen outline-none resize-none text-gray-200/90 tracking-tight text-lg"
        />
      </div> */
}
