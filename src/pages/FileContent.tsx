import { useEffect, useState } from "react";
import type { Component } from "../utils/types";
import { motion } from "framer-motion";
import { useStore } from "../utils/store";
import { lyraFolder, navigation } from "../utils/helpers";
import { writeTextFile } from "@tauri-apps/api/fs";
import "@fontsource/ia-writer-duo";
import ZoneToOpenList from "../components/ZoneToOpenList";
import {} from "@tauri-apps/api";
import { DOCUMENT_DIRECTORY } from "../utils/consts";

function FileContent(): Component {
  const { selectedFile: sF } = useStore();
  const [fileContent, setFileContent] = useState<string>(sF.content || "");
  const { goTo } = navigation();

  useEffect(() => {
    if (!sF.content) {
      goTo("/list");
      return;
    }
  }, []);

  useEffect(() => {
    async function saveFileData(): Promise<void> {
      const { folderPath } = await lyraFolder(`${sF.name}.txt`);
      writeTextFile(
        { path: folderPath, contents: fileContent },
        DOCUMENT_DIRECTORY
      );
    }
    saveFileData();
  }, [fileContent]);

  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="h-screen flex justify-center w-full min-w-[700px] max-w-[1000px]"
      >
        <textarea
          value={fileContent}
          onChange={e => setFileContent(e.target.value)}
          className="font-duo text-start bg-transparent justify-start items-center flex flex-col w-full h-screen outline-none resize-none py-10 text-gray-200/90 tracking-tight text-lg"
        />
      </motion.main>
      <ZoneToOpenList />
    </>
  );
}

export default FileContent;
