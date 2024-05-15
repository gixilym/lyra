import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
} from "react";
import { FilePlus as AddIcon, Folders as FolderIcon } from "lucide-react";
import { navigation, notification } from "../utils/helpers";
import { useStore } from "../utils/store";
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
    { updateListFiles, setSelectedFile, files } = useStore(),
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

/*
!!vaciar papelera
    showPaperBin: boolean = paperIsOpen && userConfig.paper.length > 0;
      {showPaperBin && (
        <button
          onClick={() => cleanTrash(setPaperIsOpen)}
          className="bg-red-500 hover:bg-red-400 cursor-pointer text-white outline-0 border-0 w-max px-4 py-1 rounded-xl"
          type="button"
        >
          {dictionary.Clean}
        </button>
      )}
! agregar este buscador
{openInputToSearch ? (
  <input
    placeholder={dictionary.SearchItem}
    onChange={e => setSearchItem(e.target.value)}
    onMouseLeave={() => setOpenInputToSearch(false)}
    className="outline-0 text-lg bg-gray-900 border border-gray-600/30 rounded-lg w-[280px] text-start px-4 placeholder:text-gray-400/70 text-gray-300 py-1 duration-100 h-10"
    type="text"
  />
) : (
  <SearchIcon
    onMouseEnter={() => setOpenInputToSearch(true)}
    size={25}
    className="bg-gray-900 w-11 h-11 hover:bg-gray-800 cursor-pointer border border-gray-600/30 rounded-lg p-2 duration-100"
  />
)}
*/
