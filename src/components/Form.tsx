import { animated, useSpring } from "@react-spring/web";
import {
  Plus as AddIcon,
  ArrowDownAz,
  ArrowDownZa,
  Archive as PaperIcon,
} from "lucide-react";
import {
  type FormEvent,
  type SyntheticEvent,
  useEffect,
  useState,
} from "react";
import Dialog, { type SweetAlertResult } from "sweetalert2";
import { twMerge } from "tailwind-merge";
import useFile from "../hooks/useFile";
import { configStore } from "../store/configStore";
import { fileStore } from "../store/fileStore";
import { searchStore } from "../store/searchStore";
import { PAGES } from "../utils/consts";
import translations from "../utils/dictionary";
import {
  nameIsValid,
  navigation,
  notification,
  themes,
} from "../utils/helpers";
import type { Component, File } from "../utils/types";

function Form(): Component {
  const d = translations(),
    { goTo } = navigation(),
    { isSunnyDay } = themes(),
    { createFile } = useFile(),
    { paperIsOpen, setPaperIsOpen } = configStore(),
    [fileName, setFileName] = useState<string>(""),
    { search, setSearch, order, toggleOrder } = searchStore(),
    { updateListFiles, setSelectedFile, files } = fileStore(),
    isRepeated = (fileName: string): boolean =>
      files.some((name: string) => name == fileName),
    animation = {
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 150 },
    },
    [stylesToggle, apiToggle] = useSpring(() => animation),
    [add, setAdd] = useState<boolean>(true),
    [stylesAdd, apiAdd] = useSpring(() => animation),
    [stylesPaper, apiPaper] = useSpring(() => animation);

  useEffect(() => {
    apiToggle.start(animation);
  }, [order]);

  useEffect(() => {
    apiPaper.start(animation);
  }, [paperIsOpen]);

  useEffect(() => {
    apiAdd.start(animation);
  }, [add]);

  function addFile(e: SyntheticEvent): void {
    e.stopPropagation();
    setAdd(!add);
    Dialog.fire({
      title: d.EnterTheFileName,
      input: "text",
      showCancelButton: true,
      inputAttributes: { autoComplete: "off" },
      inputAutoFocus: true,
      confirmButtonColor: "#1d74c5",
      cancelButtonColor: "#565454",
      confirmButtonText: d.Add,
      cancelButtonText: d.Cancel,
      background: isSunnyDay ? "#dedede" : "#202020",
      color: isSunnyDay ? "#000" : "#fff",
      customClass: { input: "no-focus-outline" },
    }).then((res: SweetAlertResult) => {
      if (res.isConfirmed) {
        e.preventDefault();
        const file: File = { name: res.value, content: "" };
        if (paperIsOpen) return;
        if (isRepeated(file.name)) return notification("error", d.RepeatedItem);
        if (!file.name) return notification("error", d.EnterName);
        if (!nameIsValid(file.name)) return;
        return fileManagement(file);
      }
    });
  }

  function fileManagement(file: File): void {
    setFileName("");
    createFile(file.name);
    updateListFiles(file.name);
    setSelectedFile(file);
    goTo(PAGES.file);
  }

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    if (fileName) addFile(e);
    else return;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center w-full text-slate-400 gap-y-6 max-w-[340px] opacity-80">
      <div className="flex justify-end items-start gap-x-3 w-full">
        <input
          type="search"
          className={twMerge(
            isSunnyDay
              ? "placeholder:text-gray-700 bg-gray-300 text-black border-slate-400"
              : "placeholder:text-sky-200/60 border-sky-400 bg-gray-800 text-sky-100",
            "w-full border h-[42px] rounded-md px-4 outline-0"
          )}
          placeholder={d.Search + "..."}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <animated.button
          style={stylesAdd}
          onClick={addFile}
          className={twMerge(
            isSunnyDay
              ? "bg-gray-300 hover:bg-gray-200 text-slate-800 border border-gray-400"
              : "bg-gray-800 hover:bg-gray-700 text-sky-400 border border-sky-400",
            "flex items-center justify-center gap-x-3 px-3 h-[42px] rounded-md transition-colors"
          )}>
          <AddIcon size={25} strokeWidth={2.5} />
        </animated.button>
        <animated.button
          style={stylesToggle}
          onClick={() => toggleOrder(!order)}
          className={twMerge(
            isSunnyDay
              ? "bg-gray-300 hover:bg-gray-200 text-slate-800 border border-gray-400"
              : "bg-gray-800 hover:bg-gray-700 text-sky-400 border border-sky-400",
            "flex items-center justify-center gap-x-3 px-3 h-[42px] rounded-md transition-colors"
          )}>
          {order ? (
            <ArrowDownAz size={25} strokeWidth={2} />
          ) : (
            <ArrowDownZa size={25} strokeWidth={2} />
          )}
        </animated.button>
        <animated.button
          style={stylesPaper}
          onClick={setPaperIsOpen}
          className={twMerge(
            isSunnyDay
              ? "bg-gray-300 hover:bg-gray-200 text-slate-800 border border-gray-400"
              : "bg-gray-800 hover:bg-gray-700 text-sky-400 border border-sky-400",
            paperIsOpen && isSunnyDay && "bg-gray-400",
            paperIsOpen && !isSunnyDay && "bg-blue-950",
            "flex items-center justify-center gap-x-3 border h-[42px] rounded-md transition-colors px-3"
          )}>
          <PaperIcon size={20} strokeWidth={2} />
        </animated.button>
      </div>
      {paperIsOpen && (
        <p
          className={twMerge(
            isSunnyDay ? "text-slate-900" : "text-slate-300",
            "w-full text-lg text-center"
          )}>
          {d.Archived}
        </p>
      )}
    </form>
  );
}

export default Form;
