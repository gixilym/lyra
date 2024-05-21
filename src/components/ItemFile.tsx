import { confirm as confirmDialog } from "@tauri-apps/api/dialog";
import { fileStore } from "../store/fileStore";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import translations from "../translate/dictionary";
import type { Component, File } from "../utils/types";
import { ArrowUpLeft as RecoveryIcon, Trash as RemoveIcon } from "lucide-react";
import MenuFile from "./MenuFile";
import { navigation, notification } from "../utils/helpers";
import { useEffect } from "react";
import { configStore } from "../store/configStore";
import useConfig from "../hooks/useConfig";
import useFile from "../hooks/useFile";

function ItemFile(props: Props): Component {
  const { goTo } = navigation(),
    dictionary = translations(),
    { fileName, paperIsOpen } = props,
    { updateUserConfig } = useConfig(),
    { setSelectedFile, updateListFiles, removeFileFromStore } = fileStore(),
    { deleteFile, readFile } = useFile(),
    { userConfig, setUserConfig, removeItemFromPaper } = configStore();

  useEffect(() => {
    updateUserConfig(userConfig);
  }, [userConfig]);

  async function onClickItem(): Promise<void> {
    const fileContent: string = await readFile(fileName);
    const newSelectedFile: File = { name: fileName, content: fileContent };
    setSelectedFile(newSelectedFile);
    goTo("/file");
  }

  async function recoveryPaperItem(): Promise<void> {
    const recovery = await confirmDialog(
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

  function removeFileFromEvery(): void {
    removeItemFromPaper(fileName);
    removeFileFromStore(fileName);
    deleteFile(fileName);
  }

  async function removeItem(): Promise<void> {
    const confirm = await confirmDialog(`Deseas eliminar ${fileName}?`, {
      title: "lyra",
      type: "warning",
    });

    if (confirm) {
      removeFileFromEvery();
      notification("success", "Archivo eliminado");
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
        <p>{fileName}</p>
      </div>

      {paperIsOpen ? (
        <div className="flex justify-center items-start gap-x-2">
          <RecoveryIcon
            onClick={event => {
              event.stopPropagation();
              recoveryPaperItem();
            }}
            size={23}
          />
          <RemoveIcon
            onClick={event => {
              event.stopPropagation();
              removeItem();
            }}
            size={20}
          />
        </div>
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
