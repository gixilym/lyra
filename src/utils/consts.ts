import { BaseDirectory } from "@tauri-apps/api/fs";

const BASE_DIRECTORY: { dir: BaseDirectory } = { dir: BaseDirectory.Document };

const FOLDER_NAME: string = "lyra";

const CONFIG_NAME: string = "config.json";

export { BASE_DIRECTORY, FOLDER_NAME, CONFIG_NAME };
