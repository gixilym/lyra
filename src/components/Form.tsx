import { type FormEvent, useState } from "react";
import { FilePlus as AddIcon, Folders as FolderIcon } from "lucide-react";
import { navigation, notification, themes } from "../utils/helpers";
import { fileStore } from "../store/fileStore";
import { twMerge } from "tailwind-merge";
import translations from "../translate/dictionary";
import type { Component, File } from "../utils/types";
import useFile from "../hooks/useFile";
import { configStore } from "../store/configStore";
import { PAGES } from "../utils/consts";

function Form(): Component {
  const d = translations(),
    { goTo } = navigation(),
    { createFile } = useFile(),
    { paperIsOpen, setPaperIsOpen } = configStore(),
    [fileName, setFileName] = useState<string>(""),
    newFile: File = { name: fileName, content: "..." },
    nameIsEmpty: boolean = !fileName,
    { updateListFiles, setSelectedFile, files } = fileStore(),
    nameIsRepeated: boolean = files.some((name: string) => name == fileName),
    { isSunnyDay } = themes();

  function addFile(event: FormEvent): void {
    event.preventDefault();
    if (nameIsEmpty) return notification("error", d.EnterName);
    if (nameIsRepeated) return notification("error", d.RepeatedItem);
    else return fileManagement();
  }

  function fileManagement(): void {
    setFileName("");
    createFile(newFile.name);
    updateListFiles(newFile.name);
    setSelectedFile(newFile);
    goTo(PAGES.file);
  }

  return (
    <form
      onSubmit={event => event.preventDefault()}
      className="flex justify-center items-center w-full text-slate-400 gap-x-3"
    >
      <div className="flex flex-row justify-center items-center">
        <input
          onChange={e => setFileName(e.target.value)}
          value={fileName}
          placeholder={d.AddNewItem}
          className={twMerge(
            isSunnyDay
              ? "placeholder:text-gray-700 bg-gray-300 text-black"
              : "placeholder:text-gray-300 bg-black/20 text-white",
            "w-[210px] text-lg h-11 outline-none border-gray-600/30 p-4 border-2 border-r-0 rounded-lg rounded-tr-none rounded-br-none"
          )}
          type="text"
        />
        <AddIcon
          onClick={addFile}
          size={25}
          className={twMerge(
            isSunnyDay
              ? "bg-gray-300 hover:bg-gray-400/30"
              : "bg-black/20 hover:bg-black/50",
            "cursor-pointer rounded-lg rounded-bl-none rounded-tl-none border-2 border-l-0 border-gray-600/30 w-11 h-11 p-2 duration-75"
          )}
        />
      </div>

      <FolderIcon
        size={25}
        onClick={setPaperIsOpen}
        className={twMerge(
          paperIsOpen ? "bg-black/50" : "bg-black/20",
          isSunnyDay
            ? "bg-gray-300 hover:bg-gray-400/30"
            : "bg-black/20 hover:bg-black/50",
          "cursor-pointer border border-gray-600/30 rounded-lg w-11 h-11 p-2 duration-75"
        )}
      />
    </form>
  );
}

export default Form;
