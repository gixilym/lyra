import { useEffect, useState } from "react";
import type { Component } from "../utils/types";
import { motion } from "framer-motion";
import { fileStore } from "../utils/fileStore";
import ZoneToOpenList from "../components/ZoneToOpenList";
import { configStore } from "../utils/configStore";
import useFile from "../hooks/useFile";
import "@fontsource/ia-writer-duo";
import { navigation } from "../utils/helpers";

function FileContent(): Component {
  const { selectedFile } = fileStore();
  const { spellCheck } = configStore();
  const { saveContent } = useFile();
  const [content, setContent] = useState<string>(selectedFile.content || "");

  const { goTo } = navigation();

  addEventListener("load", () => {
    goTo("/list");
  });

  useEffect(() => {
    saveContent(selectedFile.name, content);
  }, [content]);

  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="h-screen flex justify-center w-full min-w-[700px] max-w-[1000px]"
      >
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          spellCheck={spellCheck}
          autoFocus
          lang="es"
          className="font-duo text-start bg-transparent justify-start items-center flex flex-col w-full h-screen outline-none resize-none py-10 text-gray-200/90 tracking-tight text-lg"
        />
      </motion.main>
      <ZoneToOpenList />
    </>
  );
}

export default FileContent;
