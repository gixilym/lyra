import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { getFilePath } from "../utils/helpers";
import { CONFIG_FILE, DOCUMENT_DIRECTORY } from "../utils/consts";
import type { Config } from "../utils/types";
import { configStore } from "../store/configStore";
import useFile from "./useFile";

function useConfig() {
  const { setUserConfig } = configStore();
  const { fileExists, createFile } = useFile();

  async function updateUserConfig(config: Config): Promise<void> {
    const { pathFile } = await getFilePath(CONFIG_FILE);
    writeTextFile(pathFile, JSON.stringify(config), DOCUMENT_DIRECTORY);
  }

  async function recoveryUserConfig(): Promise<void> {
    const { pathFile } = await getFilePath(CONFIG_FILE);
    const fileAlreadyExists: boolean = await fileExists(pathFile);
    const config: string = await readTextFile(pathFile, DOCUMENT_DIRECTORY);
    if (fileAlreadyExists) setUserConfig(JSON.parse(config));
    else createFile(pathFile);
  }

  return { updateUserConfig, recoveryUserConfig };
}

export default useConfig;
