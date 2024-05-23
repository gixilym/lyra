import {
  renameFile as rename,
  removeFile as remove,
  readDir,
  FileEntry,
  writeTextFile,
  exists,
  readTextFile,
} from "@tauri-apps/api/fs";
import { CONFIG_NAME, BASE_DIRECTORY, FOLDER_NAME } from "../utils/consts";
import { navigation } from "../utils/helpers";
import { join } from "@tauri-apps/api/path";
import { fileStore } from "../store/fileStore";

function useFile(): FilesFunctions {
  const { goTo } = navigation();
  const { editedFile } = fileStore();

  async function getFilePath(fileName: string): Promise<{ pathFile: string }> {
    fileName = fileName.includes(CONFIG_NAME) ? CONFIG_NAME : `${fileName}.txt`;
    const pathFile: string = await join(FOLDER_NAME, fileName);
    return { pathFile };
  }

  async function renameFile(oldName: string, newName: string): Promise<void> {
    const { pathFile: oldPath } = await getFilePath(oldName);
    const { pathFile: newPath } = await getFilePath(newName);
    rename(oldPath, newPath, BASE_DIRECTORY);
    editedFile();
  }

  async function deleteFile(name: string): Promise<void> {
    const { pathFile } = await getFilePath(name);
    remove(pathFile, BASE_DIRECTORY);
  }

  async function createFile(name: string): Promise<void> {
    name = name.includes(CONFIG_NAME) ? CONFIG_NAME : name;
    const { pathFile } = await getFilePath(name);
    writeTextFile({ path: pathFile, contents: "..." }, BASE_DIRECTORY);
  }

  async function getFiles(): Promise<string[]> {
    const dir: FileEntry[] = await readDir(FOLDER_NAME, BASE_DIRECTORY);
    const bayConfig: FileEntry[] = dir.filter(f => f.name != CONFIG_NAME);
    const files: any = bayConfig.map(f => f.name?.split(".txt")[0]);
    const sortedFiles: string[] = files.sort((a: string, b: string) =>
      a.localeCompare(b)
    );
    return sortedFiles;
  }

  async function saveFileContent(name: string, content: string): Promise<void> {
    if (!name) {
      return goTo("/list");
    } else {
      const { pathFile } = await getFilePath(name);
      writeTextFile({ path: pathFile, contents: content }, BASE_DIRECTORY);
    }
  }

  async function fileExists(path: string): Promise<boolean> {
    const file: boolean = await exists(path, BASE_DIRECTORY);
    return file;
  }

  async function readFile(name: string): Promise<string> {
    const { pathFile } = await getFilePath(name);
    const content: string = await readTextFile(pathFile, BASE_DIRECTORY);
    return content;
  }

  return {
    readFile,
    renameFile,
    deleteFile,
    createFile,
    getFiles,
    saveFileContent,
    fileExists,
    getFilePath,
  };
}

export default useFile;

interface FilesFunctions {
  readFile: (name: string) => Promise<string>;
  renameFile: (oldName: string, newName: string) => Promise<void>;
  deleteFile: (name: string) => void;
  createFile: (name: string) => void;
  getFiles: () => Promise<string[]>;
  saveFileContent: (name: string, content: string) => void;
  fileExists: (path: string) => Promise<boolean>;
  getFilePath: (fileName: string) => Promise<{ pathFile: string }>;
}
