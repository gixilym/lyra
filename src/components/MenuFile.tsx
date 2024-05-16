import useFile from "../hooks/useFile";
import { Edit2 as EditIcon, Archive as TrashIcon } from "lucide-react";
import type { Component } from "../utils/types";
import { nameIsValid, getFilePath, notification } from "../utils/helpers";
import translations from "../translate/dictionary";
import { confirm } from "@tauri-apps/api/dialog";
import { configStore } from "../utils/configStore";
import { fileStore } from "../utils/fileStore";

function MenuFile({ fileName }: { fileName: string }): Component {
  const dictionary = translations();
  const { rename } = useFile();
  const { editedFile } = fileStore();
  const { addItemToPaper } = configStore();

  async function editFileName(event: any): Promise<void> {
    event.stopPropagation();
    let newName: string | null | void = prompt(
      "Editar nombre de archivo",
      fileName
    );

    if (!newName || typeof newName == null || !nameIsValid(newName)) {
      return notification("error", "Nombre inválido");
    } else {
      const oldName: string = `${fileName}.txt`;
      const { pathFile: oldPath } = await getFilePath(oldName);
      const { pathFile: newPath } = await getFilePath(`${newName}.txt`);
      rename(oldPath, newPath);
      editedFile();
      notification("success", "Nombre editado");
    }
  }

  async function moveToTrash(event: any): Promise<void> {
    event.stopPropagation();
    const accept: boolean = await confirm(
      `${dictionary.MoveToTrash} ${fileName}?`,
      { title: "lyra", type: "warning" }
    );

    if (accept) {
      addItemToPaper(fileName);
      notification("success", dictionary.SentToTrash);
    }
  }

  return (
    <div className="flex justify-center items-center gap-x-2">
      <EditIcon
        onClick={editFileName}
        className="hover:text-[rgba(209,213,219,0.6)] text-[rgba(209,213,219,0.2)] duration-75"
        size={19}
      />
      <TrashIcon
        onClick={moveToTrash}
        className="hover:text-[rgba(209,213,219,0.6)] text-[rgba(209,213,219,0.2)] duration-75"
        size={19}
      />
    </div>
  );
}

export default MenuFile;
