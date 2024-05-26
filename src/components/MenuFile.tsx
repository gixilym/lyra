import { Edit2 as EditIcon, Archive as TrashIcon } from "lucide-react";
import type { Component } from "../utils/types";
import {
  nameIsValid,
  notification,
  paperFiles,
  themes,
} from "../utils/helpers";
import translations from "../translate/dictionary";
import { fileStore } from "../store/fileStore";
import useFile from "../hooks/useFile";
import Dialog from "sweetalert2";
import useStorage from "../hooks/useStorage";
import { twMerge } from "tailwind-merge";

function MenuFile({ fileName }: { fileName: string }): Component {
  const d = translations(),
    { files: filesArr, editedFile } = fileStore(),
    files: string[] = filesArr,
    { renameFile } = useFile(),
    { setItem } = useStorage(),
    { isSunnyDay } = themes(),
    paper = paperFiles();

  function editFileName(event: any): void {
    event.stopPropagation();
    Dialog.fire({
      title: d.EnterNewName,
      input: "text",
      inputValue: fileName,
      inputAttributes: { autocapitalize: "off" },
      showCancelButton: true,
      confirmButtonText: d.Change,
      cancelButtonText: d.Cancel,
      background: isSunnyDay ? "#dedede" : "#202020",
      color: isSunnyDay ? "#000" : "#fff",
    }).then(res => {
      if (res.isConfirmed) {
        const conditions: boolean =
          !res.value || res.value == null || !nameIsValid(res.value);
        if (conditions) {
          return notification("error", d.InvalidName);
        } else if (res.value != null && files.includes(res.value)) {
          return notification("error", d.NameAlreadyExists);
        } else {
          renameFile(fileName, `${res.value}`);
          notification("success", d.EditedName);
        }
      }
    });
  }

  function moveToTrash(event: any): void {
    event.stopPropagation();
    Dialog.fire({
      title: d.AreYouSure,
      text: d.MoveToTrash,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: d.Move,
      cancelButtonText: d.Cancel,
      background: isSunnyDay ? "#dedede" : "#202020",
      color: isSunnyDay ? "#000" : "#fff",
    }).then(res => {
      if (res.isConfirmed) {
        const updatedPaper: string[] = [fileName, ...paper];
        setItem("paper", JSON.stringify(updatedPaper));
        notification("success", d.SentToTrash);
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
