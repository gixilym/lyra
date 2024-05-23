import { CONFIG_NAME } from "../utils/consts";
import type { Config } from "../utils/types";
import { configStore } from "../store/configStore";
import useFile from "./useFile";

function useConfig(): ConfigFunctions {
  const { setUserConfig } = configStore();
  const { fileExists, createFile, getFilePath, writeFile, readFile } =
    useFile();

  function updateUserConfig(config: Config): void {
    writeFile(CONFIG_NAME, String(config));
  }

  //! crear funciones personalizadas para leer configuraciones

  async function recoveryUserConfig(): Promise<void> {
    const { pathFile } = await getFilePath(CONFIG_NAME);
    const fileAlreadyExists: boolean = await fileExists(pathFile);
    const config: string = await readFile(pathFile);
    if (fileAlreadyExists) setUserConfig(JSON.parse(config));
    else createFile(pathFile);
  }

  return { updateUserConfig, recoveryUserConfig };
}

export default useConfig;

interface ConfigFunctions {
  updateUserConfig: (config: Config) => void;
  recoveryUserConfig: () => Promise<void>;
}
