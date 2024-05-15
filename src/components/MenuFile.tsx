import useFile from "../hooks/useFile";
import type { Component } from "../utils/types";
import { Edit2 as EditIcon, Archive as ArchiveIcon } from "lucide-react";
import { lyraFolder } from "../utils/helpers";
import { notification } from "../utils/helpers";
import translations from "../translate/dictionary";
import { confirm } from "@tauri-apps/api/dialog";
import { useStore } from "../utils/store";

function MenuFile({ fileName }: { fileName: string }): Component {
  const { rename } = useFile();
  const dictionary = translations();
  const { setUserConfig, userConfig } = useStore();

  async function editFileName() {
    const newName = prompt("Editar nombre de archivo", fileName);
    if (!newName || typeof newName == null) {
      return notification("error", "Nombre inválido");
    } else {
      const oldName: string = `${fileName}.txt`;
      const { folderPath: oldPath } = await lyraFolder(oldName);
      const { folderPath: newPath } = await lyraFolder(`${newName}.txt`);
      rename(oldPath, newPath);
      notification("success", "Nombre editado");
    }
  }

  async function handleMoveToTrash() {
    const accept = await confirm(`${dictionary.MoveToTrash} ${fileName}?`, {
      title: "lyra",
      type: "warning",
    });

    if (accept) {
      setUserConfig({ paper: [...userConfig.paper, fileName] });
      notification("success", dictionary.SentToTrash);
    }
  }

  return (
    <div className="flex justify-center items-center gap-x-2">
      <EditIcon
        onClick={e => {
          e.stopPropagation();
          editFileName();
        }}
        className="hover:text-[rgba(209,213,219,0.6)] text-[rgba(209,213,219,0.2)] duration-75"
        size={19}
      />
      <ArchiveIcon
        size={19}
        onClick={e => {
          e.stopPropagation();
          handleMoveToTrash();
        }}
        className="hover:text-[rgba(209,213,219,0.6)] text-[rgba(209,213,219,0.2)] duration-75"
      />
    </div>
  );
}

export default MenuFile;
