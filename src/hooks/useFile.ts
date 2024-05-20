import {
  renameFile,
  removeFile,
  readDir,
  FileEntry,
  writeTextFile,
  exists,
} from "@tauri-apps/api/fs";
import { CONFIG_FILE, DOCUMENT_DIRECTORY, FOLDER_NAME } from "../utils/consts";
import { getFilePath, navigation } from "../utils/helpers";

function useFile() {
  const { goTo } = navigation();

  function rename(oldName: string, newName: string): void {
    renameFile(oldName, newName, DOCUMENT_DIRECTORY);
  }

  function remove(path: string): void {
    removeFile(path, DOCUMENT_DIRECTORY);
  }

  async function createFile(name: string): Promise<void> {
    name = name.includes(CONFIG_FILE) ? CONFIG_FILE : `${name}.txt`;
    const { pathFile } = await getFilePath(name);
    writeTextFile({ path: pathFile, contents: "..." }, DOCUMENT_DIRECTORY);
  }

  async function getFiles(): Promise<string> {
    const dir: FileEntry[] = await readDir(FOLDER_NAME, DOCUMENT_DIRECTORY);
    const bayConfig: FileEntry[] = dir.filter(f => f.name != CONFIG_FILE);
    const files: any = bayConfig.map(f => f.name?.split(".txt")[0]);
    return files;
  }

  async function saveContent(name: string, content: string): Promise<void> {
    if (!name) {
      return goTo("/list");
    } else {
      const { pathFile } = await getFilePath(`${name}.txt`);
      writeTextFile({ path: pathFile, contents: content }, DOCUMENT_DIRECTORY);
    }
  }

  async function fileExists(path: string): Promise<boolean> {
    const file: boolean = await exists(path, DOCUMENT_DIRECTORY);
    return file;
  }

  // function readFile() {}

  return {
    rename,
    remove,
    createFile,
    getFiles,
    saveContent,
    fileExists,
  };
}

export default useFile;
