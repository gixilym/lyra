import { BaseDirectory } from "@tauri-apps/api/fs";

const DOCUMENT_DIRECTORY: { dir: BaseDirectory } = {
  dir: BaseDirectory.Document,
};

const FOLDER_NAME: string = "lyra";

export { DOCUMENT_DIRECTORY, FOLDER_NAME };
