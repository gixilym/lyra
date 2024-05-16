import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
} from "react";
import { FilePlus as AddIcon, Folders as FolderIcon } from "lucide-react";
import { navigation, notification } from "../utils/helpers";
import { fileStore } from "../utils/fileStore";
import { twMerge } from "tailwind-merge";
import translations from "../translate/dictionary";
import type { Component, File } from "../utils/types";
import useFile from "../hooks/useFile";

function Form(props: Props): Component {
  const dictionary = translations(),
    { goTo } = navigation(),
    { create } = useFile(), 
    { paperIsOpen, setPaperIsOpen } = props,
    [fileName, setFileName] = useState<string>(""),
    newFile: File = { name: fileName, content: "..." },
    nameIsEmpty: boolean = !fileName,
    { updateListFiles, setSelectedFile, files } = fileStore(),
    nameIsRepeated: boolean = files.some((name: string) => name == fileName);

  function addFile(event: FormEvent): void {
    event.preventDefault();
    if (nameIsEmpty) return notification("error", dictionary.EnterName);
    if (nameIsRepeated) return notification("error", dictionary.RepeatedItem);
    else return fileManagement();
  }

  function fileManagement(): void {
    setFileName("");
    create(newFile.name);
    notification("success", dictionary.SavedNote);
    updateListFiles(newFile.name);
    setSelectedFile(newFile);
    goTo("/file");
  }

  return (
    <form className="flex justify-start items-center w-full text-slate-400 gap-x-3">
      <div className="flex flex-row justify-center items-center">
        <input
          onChange={e => setFileName(e.target.value)}
          value={fileName}
          placeholder={dictionary.AddNewItem}
          className="bg-black/20 w-[210px] text-lg h-11 outline-none p-4 border border-r-0 rounded-lg rounded-tr-none rounded-br-none border-gray-600/60"
          type="text"
        />
        <AddIcon
          onClick={addFile}
          size={25}
          className="bg-black/20 hover:bg-black/50 cursor-pointer rounded-tl-none rounded-bl-none border border-l-0 border-gray-600/60 rounded-lg w-11 h-11 p-2 duration-75"
        />
      </div>

      <FolderIcon
        size={25}
        onClick={() => setPaperIsOpen(!paperIsOpen)}
        className={twMerge(
          paperIsOpen ? "bg-black/50" : "bg-black/20",
          "hover:bg-black/50 cursor-pointer border border-gray-600/30 rounded-lg w-11 h-11 p-2 duration-75"
        )}
      />
    </form>
  );
}

interface Props {
  setSearchItem: Dispatch<SetStateAction<string>>;
  setPaperIsOpen: Dispatch<SetStateAction<boolean>>;
  paperIsOpen: boolean;
}

export default Form;
