import { useEffect, useState } from "react";
import type { Component } from "../utils/types";
import { motion } from "framer-motion";
import { fileStore } from "../store/fileStore";
import { configStore } from "../store/configStore";
import useFile from "../hooks/useFile";
import "@fontsource/ia-writer-duo";
import MainContainer from "../components/MainContainer";

function FileContent(): Component {
  const { selectedFile } = fileStore();
  const { spellCheck } = configStore();
  const { saveContent } = useFile();
  const [content, setContent] = useState<string>(selectedFile.content || "");

  // const { goTo } = navigation();

  // addEventListener("load", () => {
  //   goTo("/list");
  // });

  useEffect(() => {
    saveContent(selectedFile.name, content);
  }, [content]);

  return (
    <MainContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="h-full flex justify-center items-center w-full min-w-[600px] max-w-[800px] bg-transparent"
      >
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          spellCheck={spellCheck}
          autoFocus
          lang="es"
          className="font-duo text-center w-full bg-transparent min-h-screen outline-none resize-none py-10 text-gray-200/90 tracking-tight text-lg"
        />
      </motion.div>
    </MainContainer>
  );
}

export default FileContent;
