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

addGlobalBinds(mousetrap);

function FileContent(): Component {
  const { selectedFile } = fileStore();
  const { spellCheck, setSpellCheck } = configStore();
  const { saveFileContent } = useFile();
  const [content, setContent] = useState<string>(selectedFile.content || "");
  const CommandListener: any = mousetrap;

  CommandListener.bindGlobal("ctrl+m", () => activateSpelling());

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
          className="font-duo text-center w-full bg-transparent min-h-screen outline-none resize-none text-gray-200/90 tracking-tight text-lg"
        />
      </div>
    </MainContainer>
  );
}

export default FileContent;
