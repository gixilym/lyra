import useFile from "../hooks/useFile";
import { Edit2 as EditIcon, Archive as TrashIcon } from "lucide-react";
import type { Component } from "../utils/types";
import { nameIsValid, notification } from "../utils/helpers";
import translations from "../translate/dictionary";
import { confirm } from "@tauri-apps/api/dialog";
import { configStore } from "../store/configStore";
import { fileStore } from "../store/fileStore";

function MenuFile({ fileName }: { fileName: string }): Component {
  const dictionary = translations();
  const { renameFile } = useFile();
  const { editedFile, files: filesArr } = fileStore();
  const { addItemToPaper } = configStore();

  async function editFileName(event: any): Promise<void> {
    event.stopPropagation();
    const files: string[] = filesArr;
    let newName: string | null | void = prompt(
      "Editar nombre de archivo",
      fileName
    );
    const condition: boolean =
      !newName || newName == null || !nameIsValid(newName);

    if (condition) {
      return notification("error", "Nombre inválido");
    } else if (newName != null && files.includes(newName)) {
      return notification("error", "El nombre ya existe");
    } else {
      renameFile(fileName, `${newName}`);
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
