import { Edit2 as EditIcon, Archive as TrashIcon } from "lucide-react";
import Dialog from "sweetalert2";
import { twMerge } from "tailwind-merge";
import useFile from "../hooks/useFile";
import useStorage from "../hooks/useStorage";
import { fileStore } from "../store/fileStore";
import translations from "../utils/dictionary";
import {
  nameIsValid,
  notification,
  paperFiles,
  themes,
} from "../utils/helpers";
import type { Component } from "../utils/types";
import { SyntheticEvent } from "react";

function MenuFile({ fileName }: { fileName: string }): Component {
  const d = translations(),
    { files: filesArr, editedFile } = fileStore(),
    files: string[] = filesArr,
    { renameFile } = useFile(),
    { setItem } = useStorage(),
    { isSunnyDay } = themes(),
    paper = paperFiles();

  function editFileName(event: SyntheticEvent): void {
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
        const conditions: boolean = !res.value || res.value == null;
        if (conditions) {
          return notification("error", d.InvalidName);
        } else if (!nameIsValid(res.value)) return;
        else if (res.value != null && files.includes(res.value)) {
          return notification("error", d.NameAlreadyExists);
        } else {
          renameFile(fileName, `${res.value}`);
          notification("success", d.EditedName);
        }
      }
    });
  }

  function moveToTrash(event: SyntheticEvent): void {
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
