import { animated, useSpring } from "@react-spring/web";
import { Edit2 as EditIcon, Archive as TrashIcon } from "lucide-react";
import type { SyntheticEvent } from "react";
import Dialog from "sweetalert2";
import { twMerge } from "tailwind-merge";
import useFile from "../hooks/useFile";
import usePreferences from "../hooks/usePreferences";
import useStorage from "../hooks/useStorage";
import { fileStore } from "../store/fileStore";
import translations from "../utils/dictionary";
import { nameIsValid, notification, themes } from "../utils/helpers";
import type { Component } from "../utils/types";

function MenuFile({ fileName }: Props): Component {
  const d = translations(),
    { files: filesArr, editedFile } = fileStore(),
    files: string[] = filesArr,
    { renameFile } = useFile(),
    { setItem } = useStorage(),
    { isDay } = themes(),
    [styles] = useSpring(() => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 100 },
    }));

  function editFileName(e: SyntheticEvent): void {
    e.stopPropagation();
    Dialog.fire({
      title: d.EnterNewName,
      input: "text",
      inputValue: fileName,
      inputAttributes: { autocapitalize: "off" },
      showCancelButton: true,
      confirmButtonText: d.Change,
      cancelButtonText: d.Cancel,
      confirmButtonColor: "#1d74c5",
      cancelButtonColor: "#565454",
      background: isDay ? "#dedede" : "#202020",
      color: isDay ? "#000" : "#fff",
      customClass: { input: "no-focus-outline" },
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

  function moveToTrash(e: SyntheticEvent): void {
    e.stopPropagation();
    const { myPaper } = usePreferences();
    Dialog.fire({
      text: d.MoveToTrash,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1d74c5",
      cancelButtonColor: "#565454",
      confirmButtonText: d.Confirm,
      cancelButtonText: d.Cancel,
      background: isDay ? "#dedede" : "#202020",
      color: isDay ? "#000" : "#fff",
      customClass: { input: "no-focus-outline" },
    }).then(res => {
      if (res.isConfirmed) {
        const updatedPaper: string[] = [fileName, ...myPaper()];
        setItem("paper", JSON.stringify(updatedPaper));
        notification("success", d.SentToTrash);
        editedFile();
      }
    });
  }

  return (
    <animated.div
      style={styles}
      className="flex w-20 justify-center items-center gap-x-1 h-full absolute top-0 right-0 duration-200">
      <EditIcon
        onClick={editFileName}
        className={twMerge(
          isDay
            ? "hover:text-gray-500 text-slate-800"
            : "text-[#6cd3ff] hover:text-[#c3edff]",
          "h-full w-8 py-3"
        )}
        size={19}
      />
      <TrashIcon
        onClick={moveToTrash}
        className={twMerge(
          isDay
            ? "hover:text-gray-500 text-slate-800"
            : "text-[#6cd3ff] hover:text-[#c3edff]",
          " h-full w-8 py-3"
        )}
        size={19}
      />
    </animated.div>
  );
}

export default MenuFile;

interface Props {
  fileName: string;
}
