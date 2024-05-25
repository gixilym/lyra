import { Edit2 as EditIcon, Archive as TrashIcon } from "lucide-react";
import type { Component } from "../utils/types";
import { nameIsValid, notification, themes } from "../utils/helpers";
import translations from "../translate/dictionary";
import { fileStore } from "../store/fileStore";
import useFile from "../hooks/useFile";
import Dialog from "sweetalert2";
import useStorage from "../hooks/useStorage";
import { twMerge } from "tailwind-merge";

function MenuFile({ fileName }: { fileName: string }): Component {
  const dictionary = translations(),
    { files: filesArr, editedFile } = fileStore(),
    files: string[] = filesArr,
    { renameFile } = useFile(),
    { getItem, setItem } = useStorage(),
    { isSunnyDay } = themes();

  function editFileName(event: any): void {
    event.stopPropagation();
    Dialog.fire({
      title: "Ingresa el nuevo nombre",
      input: "text",
      inputValue: fileName,
      inputAttributes: { autocapitalize: "off" },
      showCancelButton: true,
      confirmButtonText: "Cambiar",
      cancelButtonText: "Cancelar",
      background: isSunnyDay ? "#dedede" : "#202020",
      color: isSunnyDay ? "#000" : "#fff",
    }).then(res => {
      if (res.isConfirmed) {
        const conditions: boolean =
          !res.value || res.value == null || !nameIsValid(res.value);
        if (conditions) {
          return notification("error", "Nombre inválido");
        } else if (res.value != null && files.includes(res.value)) {
          return notification("error", "El nombre ya existe");
        } else {
          renameFile(fileName, `${res.value}`);
          notification("success", "Nombre editado");
        }
      }
    });
  }

  function moveToTrash(event: any): void {
    event.stopPropagation();
    Dialog.fire({
      title: "¿Estás seguro?",
      text: "Mover archivo a la papelera",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Mover",
      cancelButtonText: "Cancelar",
      background: isSunnyDay ? "#dedede" : "#202020",
      color: isSunnyDay ? "#000" : "#fff",
    }).then(res => {
      if (res.isConfirmed) {
        const paper: string[] = JSON.parse(getItem("paper") as string) ?? [];
        const updatedPaper: string[] = [fileName, ...paper];
        setItem("paper", JSON.stringify(updatedPaper));
        notification("success", dictionary.SentToTrash);
        editedFile();
      }
    });
  }

  return (
    <div className="flex justify-center items-center gap-x-2">
      <EditIcon
        onClick={editFileName}
        className={twMerge(
          isSunnyDay
            ? "hover:text-gray-500 text-[rgba(0,0,0,0.2)]"
            : "hover:text-[rgba(209,213,219,0.6)] text-[rgba(209,213,219,0.2)]",
          "duration-75"
        )}
        size={19}
      />
      <TrashIcon
        onClick={moveToTrash}
        className={twMerge(
          isSunnyDay
            ? "hover:text-gray-500 text-[rgba(0,0,0,0.2)]"
            : "hover:text-[rgba(209,213,219,0.6)] text-[rgba(209,213,219,0.2)]",
          "duration-75"
        )}
        size={19}
      />
    </div>
  );
}

export default MenuFile;
