import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { CONFIG_NAME, BASE_DIRECTORY } from "../utils/consts";
import type { Config } from "../utils/types";
import { configStore } from "../store/configStore";
import useFile from "./useFile";

function useConfig() {
  const { setUserConfig } = configStore();
  const { fileExists, createFile, getFilePath } = useFile();

  async function updateUserConfig(config: Config): Promise<void> {
    const { pathFile } = await getFilePath(CONFIG_NAME);
    writeTextFile(pathFile, JSON.stringify(config), BASE_DIRECTORY);
  }

  async function recoveryUserConfig(): Promise<void> {
    const { pathFile } = await getFilePath(CONFIG_NAME);
    const fileAlreadyExists: boolean = await fileExists(pathFile);
    const config: string = await readTextFile(pathFile, BASE_DIRECTORY);
    if (fileAlreadyExists) setUserConfig(JSON.parse(config));
    else createFile(pathFile);
  }

  return { updateUserConfig, recoveryUserConfig };
}

export default useConfig;
