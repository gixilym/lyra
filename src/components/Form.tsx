import { FilePlus as AddIcon, Folders as PaperIcon } from "lucide-react";
import { type FormEvent, type SyntheticEvent, useState } from "react";
import Dialog from "sweetalert2";
import { twMerge } from "tailwind-merge";
import useFile from "../hooks/useFile";
import useStorage from "../hooks/useStorage";
import { configStore } from "../store/configStore";
import { fileStore } from "../store/fileStore";
import { PAGES } from "../utils/consts";
import translations from "../utils/dictionary";
import {
  nameIsValid,
  navigation,
  notification,
  paperFiles,
  themes,
} from "../utils/helpers";
import type { Component, File } from "../utils/types";

function Form(): Component {
  const d = translations(),
    { goTo } = navigation(),
    { isSunnyDay } = themes(),
    { createFile, deleteFile } = useFile(),
    { paperIsOpen, setPaperIsOpen } = configStore(),
    [fileName, setFileName] = useState<string>(""),
    { setItem } = useStorage(),
    paper = paperFiles(),
    newFile: File = { name: fileName, content: "" },
    nameIsEmpty: boolean = !fileName,
    { updateListFiles, setSelectedFile, files, editedFile, setFiles } =
      fileStore(),
    nameIsRepeated: boolean = files.some((name: string) => name == fileName);

  function addFile(event: FormEvent): void {
    event.preventDefault();
    if (paperIsOpen) return;
    if (nameIsRepeated) return notification("error", d.RepeatedItem);
    if (nameIsEmpty) return notification("error", d.EnterName);
    if (!nameIsValid(fileName)) return;
    return fileManagement();
  }

  function fileManagement(): void {
    setFileName("");
    createFile(newFile.name);
    updateListFiles(newFile.name);
    setSelectedFile(newFile);
    goTo(PAGES.file);
  }

  function recoveryEvery(event: SyntheticEvent): void {
    event.stopPropagation();
    Dialog.fire({
      title: d.AreYouSure,
      text: d.YouWantToRestoreAllFiles,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: d.Recover,
      cancelButtonText: d.Cancel,
      background: isSunnyDay ? "#dedede" : "#202020",
      color: isSunnyDay ? "#000" : "#fff",
    }).then(res => {
      if (res.isConfirmed) {
        const updatedFiles: string[] = [...files, paper];
        setFiles(updatedFiles);
        setItem("files", JSON.stringify(updatedFiles));
        setItem("paper", JSON.stringify([]));
        notification("success", d.RecoveryRecords);
        editedFile();
      }
    });
  }

  function deleteEvery(event: SyntheticEvent): void {
    event.stopPropagation();
    Dialog.fire({
      title: d.AreYouSure,
      text: d.YouWantToDeleteAllFiles,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: d.Delete,
      cancelButtonText: d.Cancel,
      background: isSunnyDay ? "#dedede" : "#202020",
      color: isSunnyDay ? "#000" : "#fff",
    }).then(res => {
      if (res.isConfirmed) {
        setItem("paper", JSON.stringify([]));
        paper.forEach(name => deleteFile(name));
        notification("success", d.DeletedRecords);
        editedFile();
      }
    });
  }

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    if (fileName) addFile(event);
    else return;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center w-full text-slate-400 gap-y-6"
    >
      <div className="flex justify-center items-center gap-x-3 w-full">
        <div
          className={twMerge(
            paperIsOpen ? "opacity-50" : "opacity-100",
            "flex flex-row justify-center items-center"
          )}
        >
          <input
            onChange={e => setFileName(e.target.value)}
            value={fileName}
            placeholder={paperIsOpen ? d.Archived : d.AddNewItem}
            disabled={paperIsOpen}
            className={twMerge(
              isSunnyDay
                ? "placeholder:text-gray-700 bg-gray-300 text-black"
                : "placeholder:text-gray-400/60 bg-black/20 text-white",
              paperIsOpen ? "cursor-default" : "cursor-auto",
              "w-[210px] text-lg h-11 outline-none border-gray-600/30 p-4 border-2 border-r-0 rounded-lg rounded-tr-none rounded-br-none"
            )}
            type="text"
          />
          <AddIcon
            onClick={addFile}
            size={25}
            opacity={paperIsOpen ? 0.5 : 1}
            style={{ cursor: paperIsOpen ? "default" : "pointer" }}
            className={twMerge(
              isSunnyDay
                ? "bg-gray-300 hover:bg-gray-400/30"
                : "bg-black/20 hover:bg-black/50",
              paperIsOpen &&
                `hover:${isSunnyDay ? "bg-gray-300" : "bg-black/20"}`,
              "rounded-lg rounded-bl-none rounded-tl-none border-2 border-l-0 border-gray-600/30 w-11 h-11 p-2 duration-75"
            )}
          />
        </div>

        <PaperIcon
          size={25}
          onClick={setPaperIsOpen}
          className={twMerge(
            isSunnyDay ? "bg-gray-300" : "bg-black/20",
            paperIsOpen ? "bg-indigo-800/70" : "bg-inherit",
            "cursor-pointer border border-gray-600/30 rounded-lg w-11 h-11 p-2 duration-75 hover:scale-95"
          )}
        />
      </div>
      {paperIsOpen && paper.length > 0 && (
        <div className="flex justify-center items-center gap-x-4 w-full opacity-80 font-sara">
          <button
            onClick={recoveryEvery}
            className="bg-[#5ff3fa] hover:bg-[#7df9ff] duration-75 w-36 py-1 rounded-lg text-black text-lg"
          >
            {d.RecoverEverything}
          </button>
          <button
            onClick={deleteEvery}
            className="bg-[#ff7575] hover:bg-[#ff8f8f] duration-75 w-36 py-1 rounded-lg text-black text-lg"
          >
            {d.DeleteEverything}
          </button>
        </div>
      )}
    </form>
  );
}

export default Form;
