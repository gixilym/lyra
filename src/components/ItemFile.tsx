import { readTextFile } from "@tauri-apps/api/fs";
import { confirm } from "@tauri-apps/api/dialog";
import { fileStore } from "../store/fileStore";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import translations from "../translate/dictionary";
import type { Component, File } from "../utils/types";
import { ArrowUpLeft as RecoveryIcon } from "lucide-react";
import MenuFile from "./MenuFile";
import { getFilePath, navigation } from "../utils/helpers";
import { DOCUMENT_DIRECTORY } from "../utils/consts";
import { useEffect } from "react";
import { configStore } from "../store/configStore";
import useConfig from "../hooks/useConfig";

function ItemFile(props: Props): Component {
  const { goTo } = navigation(),
    dictionary = translations(),
    { fileName, paperIsOpen } = props,
    { updateUserConfig } = useConfig(),
    { setSelectedFile, updateListFiles } = fileStore(),
    { userConfig, setUserConfig } = configStore();

  useEffect(() => {
    updateUserConfig(userConfig);
  }, [userConfig]);

  async function onClickItem(): Promise<void> {
    const { pathFile } = await getFilePath(`${fileName}.txt`);
    const fileContent = await readTextFile(pathFile, DOCUMENT_DIRECTORY);
    const newSelectedFile: File = { name: fileName, content: fileContent };
    setSelectedFile(newSelectedFile);
    goTo("/file");
  }

  async function recoveryPaperItem(event: any) {
    event.stopPropagation();

    const recovery = await confirm(
      `${dictionary.RestoreQuestion} ${fileName}?`,
      { title: "lyra", type: "warning" }
    );

    if (recovery) {
      setUserConfig({
        paper: userConfig.paper.filter((item: any) => item != fileName),
      });
      updateListFiles(fileName);
      toast(`${dictionary.RestoreSuccess} ${fileName}`, {
        icon: "❤️",
        duration: 2000,
        style: {
          backgroundColor: "#202020",
          color: "#69ff44",
        },
      });
    }
  }

  return (
    <motion.li
      onClick={onClickItem}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="w-full max-w-[330px] h-11 rounded text-gray-300 py-2 px-4 hover:cursor-pointer bg-gray-800/60 duration-75 flex justify-between items-center border-l-2 border-b-2 border-gray-600/30  hover:bg-gray-800"
    >
      <div className="flex justify-between items-center gap-x-4 w-full">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          {fileName}
        </motion.p>
      </div>

      {paperIsOpen ? (
        <RecoveryIcon onClick={recoveryPaperItem} />
      ) : (
        <MenuFile fileName={fileName} />
      )}
    </motion.li>
  );
}

export default ItemFile;

interface Props {
  fileName: string;
  paperIsOpen?: boolean;
}
