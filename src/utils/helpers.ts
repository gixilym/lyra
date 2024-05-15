import { join } from "@tauri-apps/api/path";
import toast from "react-hot-toast";
import { type NavigateFunction, useNavigate } from "react-router-dom";
import translations from "../translate/dictionary";
import { confirm } from "@tauri-apps/api/dialog";
import { useStore } from "./store";
import { type Dispatch, type SetStateAction } from "react";
import { FOLDER_NAME } from "./consts";

function navigation(): { goTo: (route: string) => void } {
  const navigate: NavigateFunction = useNavigate();
  const goTo = (route: string): void => navigate(route);
  return { goTo };
}

function notification(type: "success" | "error", msg: string): void {
  toast[type](msg, {
    duration: 2000,
    style: { backgroundColor: "#202020", color: "#fff" },
  });
}

async function lyraFolder(fileName: string): Promise<{ folderPath: string }> {
  const folderPath: string = await join(FOLDER_NAME, fileName);
  return { folderPath };
}

async function cleanTrash(
  setPaperIsOpen: Dispatch<SetStateAction<boolean>>
): Promise<void> {
  const dictionary = translations();
  const { setUserConfig } = useStore();
  // const { remove } = useFile();

  const confirmClean = await confirm(dictionary.CleanEvery, {
    title: "lyra",
    type: "warning",
  });

  if (confirmClean) {
    notification("success", dictionary.DeleteFiles);
    setPaperIsOpen(false);
    setUserConfig({ paper: [] });
    // userConfig.paper.map(async function (item: File) {
    //   console.log(item.lastModified);
    //   // const { folderPath } = await lyraFolder(`${item.name}.txt`);
    //   // remove(folderPath);
    // });
  }
}

export { notification, navigation, cleanTrash, lyraFolder };
