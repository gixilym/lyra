import {
  renameFile,
  removeFile,
  readDir,
  FileEntry,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { DOCUMENT_DIRECTORY, FOLDER_NAME } from "../utils/consts";
import { lyraFolder } from "../utils/helpers";

function useFile() {
  function rename(oldName: string, newName: string): void {
    renameFile(oldName, newName, DOCUMENT_DIRECTORY);
  }

  function remove(path: string): void {
    removeFile(path, DOCUMENT_DIRECTORY);
  }

  async function create(name: string): Promise<void> {
    const { folderPath } = await lyraFolder(`${name}.txt`);
    writeTextFile({ path: folderPath, contents: "..." }, DOCUMENT_DIRECTORY);
  }

  async function getFiles(): Promise<string> {
    const dir: FileEntry[] = await readDir(FOLDER_NAME, DOCUMENT_DIRECTORY);
    const files: any = dir.map(file => file.name?.split(".txt")[0]);
    return files;
  }

  return { rename, remove, create, getFiles };
}

export default useFile;
