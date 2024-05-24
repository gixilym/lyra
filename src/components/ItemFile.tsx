import { fileStore } from "../store/fileStore";
import { motion } from "framer-motion";
import translations from "../translate/dictionary";
import type { Component, File } from "../utils/types";
import { ArrowUpLeft as RecoveryIcon, Trash as RemoveIcon } from "lucide-react";
import MenuFile from "./MenuFile";
import { navigation, notification } from "../utils/helpers";
import { configStore } from "../store/configStore";
import useFile from "../hooks/useFile";
import Dialog from "sweetalert2";
import { PAGES } from "../utils/consts";
import useStorage from "../hooks/useStorage";

function ItemFile({ fileName }: { fileName: string }): Component {
  const dictionary = translations(),
    { goTo } = navigation(),
    { deleteFile, readFile } = useFile(),
    { setSelectedFile, editedFile } = fileStore(),
    { paperIsOpen } = configStore(),
    { getItem, setItem } = useStorage();

  async function openFile(): Promise<void> {
    const fileContent: string = await readFile(fileName);
    const newSelectedFile: File = { name: fileName, content: fileContent };
    setSelectedFile(newSelectedFile);
    goTo(PAGES.file);
  }

  function recoveryPaperItem(event: any): void {
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
        const paper: string = (getItem("paper") as string) ?? [];
        const updatedPaper: string[] = JSON.parse(paper).filter(
          (f: string) => f != fileName
        );
        setItem("paper", JSON.stringify(updatedPaper));
        notification("success", dictionary.RestoreSuccess);
        editedFile();
      }
    });
  }

  function removeItem(event: any): void {
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
        const paper: string = (getItem("paper") as string) ?? [];
        const updatedPaper: string[] = JSON.parse(paper).filter(
          (f: string) => f != fileName
        );
        setItem("paper", JSON.stringify(updatedPaper));
        deleteFile(fileName);
        editedFile();
        notification("success", "Archivo eliminado");
      }
    });
  }

  return (
    <motion.li
      onClick={openFile}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="w-full max-w-[330px] h-11 rounded text-gray-300 py-2 px-4 hover:cursor-pointer bg-gray-800/60 duration-75 flex justify-between items-center border-l-2 border-b-2 border-gray-600/30  hover:bg-gray-800"
    >
      <p className="text-md w-full text-start">{fileName}</p>
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
