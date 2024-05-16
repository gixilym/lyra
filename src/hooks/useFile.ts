import {
  renameFile,
  removeFile,
  readDir,
  FileEntry,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { DOCUMENT_DIRECTORY, FOLDER_NAME } from "../utils/consts";
import { getFilePath, navigation } from "../utils/helpers";

function useFile() {
  const { goTo } = navigation();

  function rename(oldName: string, newName: string): void {
    renameFile(oldName, newName, DOCUMENT_DIRECTORY);
  }

  function remove(path: string): void {
    removeFile(path, DOCUMENT_DIRECTORY);
  }

  async function create(name: string): Promise<void> {
    const { pathFile } = await getFilePath(`${name}.txt`);
    writeTextFile({ path: pathFile, contents: "..." }, DOCUMENT_DIRECTORY);
  }

  async function getFiles(): Promise<string> {
    const dir: FileEntry[] = await readDir(FOLDER_NAME, DOCUMENT_DIRECTORY);
    const bayConfig: FileEntry[] = dir.filter(f => f.name != "config.json");
    const files: any = bayConfig.map(f => f.name?.split(".txt")[0]);
    return files;
  }

  async function saveContent(name: string, content: string): Promise<void> {
    if (!name || !content) {
      return goTo("/list");
    } else {
      const { pathFile } = await getFilePath(`${name}.txt`);
      writeTextFile({ path: pathFile, contents: content }, DOCUMENT_DIRECTORY);
    }
  }

  return { rename, remove, create, getFiles, saveContent };
}

export default useFile;
