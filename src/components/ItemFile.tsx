import { fileStore } from "../store/fileStore";
import { motion } from "framer-motion";
import translations from "../translate/dictionary";
import type { Component, File } from "../utils/types";
import { ArrowUpLeft as RecoveryIcon, Trash as RemoveIcon } from "lucide-react";
import MenuFile from "./MenuFile";
import { navigation, notification } from "../utils/helpers";
import { useEffect } from "react";
import { configStore } from "../store/configStore";
import useConfig from "../hooks/useConfig";
import useFile from "../hooks/useFile";
import Dialog from "sweetalert2";
import { PAGES } from "../utils/consts";

function ItemFile({ fileName }: { fileName: string }): Component {
  const { goTo } = navigation(),
    dictionary = translations(),
    { updateUserConfig } = useConfig(),
    { deleteFile, readFile } = useFile(),
    { setSelectedFile, updateListFiles, removeFileFromStore } = fileStore(),
    { userConfig, setUserConfig, removeItemFromPaper, paperIsOpen } =
      configStore();

  useEffect(() => {
    updateUserConfig(userConfig);
  }, [userConfig]);

  async function onClickItem(): Promise<void> {
    const fileContent: string = await readFile(fileName);
    const newSelectedFile: File = { name: fileName, content: fileContent };
    setSelectedFile(newSelectedFile);
    goTo(PAGES.file);
  }

  async function recoveryPaperItem(event: any): Promise<void> {
    event.stopPropagation();
    Dialog.fire({
      title: "¿Estás seguro?",
      text: "Recuperar archivo",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Recuperar",
      cancelButtonText: "Cancelar",
      background: "#202020",
      color: "#fff",
    }).then(res => {
      if (res.isConfirmed) {
        setUserConfig({
          paper: userConfig.paper.filter((item: any) => item != fileName),
        });
        updateListFiles(fileName);
        notification("success", dictionary.RestoreSuccess);
      }
    });
  }

  function removeFileFromEvery(): void {
    removeItemFromPaper(fileName);
    removeFileFromStore(fileName);
    deleteFile(fileName);
  }

  async function removeItem(event: any): Promise<void> {
    event.stopPropagation();
    Dialog.fire({
      title: "¿Estás seguro?",
      text: "Eliminar archivo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      background: "#202020",
      color: "#fff",
    }).then(res => {
      if (res.isConfirmed) {
        removeFileFromEvery();
        notification("success", "Archivo eliminado");
      }
    });
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
          <RecoveryIcon onClick={recoveryPaperItem} size={23} />
          <RemoveIcon onClick={removeItem} size={20} />
        </div>
      ) : (
        <MenuFile fileName={fileName} />
      )}
    </motion.li>
  );
}

export default ItemFile;
