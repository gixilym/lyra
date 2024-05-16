import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { getFilePath } from "../utils/helpers";
import { DOCUMENT_DIRECTORY } from "../utils/consts";
import { Config } from "../utils/types";
import { configStore } from "../utils/configStore";

function useConfig() {
  const { setUserConfig } = configStore();

  async function updateUserConfig(config: Config): Promise<void> {
    const { pathFile } = await getFilePath("config.json");
    writeTextFile(pathFile, JSON.stringify(config), DOCUMENT_DIRECTORY);
  }

  async function recoveryUserConfig(): Promise<void> {
    const { pathFile } = await getFilePath("config.json");
    const config: string = await readTextFile(pathFile, DOCUMENT_DIRECTORY);
    setUserConfig(JSON.parse(config));
  }

  return { updateUserConfig, recoveryUserConfig };
}

export default useConfig;
