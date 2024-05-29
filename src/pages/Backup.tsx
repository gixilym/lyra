import { copyFile, createDir, exists } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import MainContainer from "../components/MainContainer";
import useFile from "../hooks/useFile";
import useLoading from "../hooks/useLoading";
import useStorage from "../hooks/useStorage";
import { BACKUP_FOLDER, BASE_DIRECTORY } from "../utils/consts";
import { themes } from "../utils/helpers";
import type { Component } from "../utils/types";
import Dialog from "sweetalert2";
import {
  DatabaseBackup as BackupIcon,
  FolderUp as ImportIcon,
  FileUp as FileIcon,
} from "lucide-react";

function Backup(): Component {
  const { isSunnyDay } = themes(),
    { getFilePath } = useFile(),
    { getItem, setItem } = useStorage(),
    { startLoading, isLoading, finishLoading } = useLoading(),
    files: string[] = JSON.parse(getItem("files") as string) ?? [],
    [backupCreated, setBackupCreated] = useState<boolean>(false),
    [backupDate, setBackupDate] = useState<string>(
      () => getItem("backup-date") ?? "nunca"
    );

  async function createBackup(): Promise<void> {
    startLoading();
    const backupExists: boolean = await exists(BACKUP_FOLDER, BASE_DIRECTORY);
    if (!backupExists) {
      createDir(BACKUP_FOLDER, BASE_DIRECTORY)
        .then(() => copyFiles())
        .catch(err => console.error(`Error creando backup: ${err.message}`));
    } else copyFiles();
  }

  async function copyFiles(): Promise<() => void> {
    for await (const file of files) {
      const { pathFile: originalFilePath } = await getFilePath(file);
      const backupFilePath: string = await join(BACKUP_FOLDER, `${file}.txt`);
      copyFile(originalFilePath, backupFilePath, BASE_DIRECTORY).catch(err =>
        console.error(`Error copiando ${file}: ${err.message}`)
      );
    }
    getDate();
    const timerOne = setTimeout(() => finishLoading(), 2000);
    const timerTwo = setTimeout(() => setBackupCreated(true), 2000);
    return () => {
      clearTimeout(timerOne);
      clearTimeout(timerTwo);
    };
  }

  function getDate(): void {
    const date = new Date(),
      day = date.getDate().toString().padStart(2, "0"),
      month = (date.getMonth() + 1).toString().padStart(2, "0"),
      year = date.getFullYear().toString().slice(-2),
      hour = date.getHours().toString().padStart(2, "0"),
      minutes = date.getMinutes().toString().padStart(2, "0"),
      formattedDate = `${hour}:${minutes} h el ${day}/${month}/${year}`;
    setItem("backup-date", formattedDate);
    setBackupDate(formattedDate);
  }

  function infoAboutBackup(): void {
    Dialog.fire({
      title: "Importante",
      text: "Solo se respaldarán los archivos que NO estén en la papelera, en caso que desees respaldar la papelera deberás realizarlo manualmente.",
      icon: "info",
      showCancelButton: false,
      confirmButtonColor: "#ffffff0",
      confirmButtonText: "OK",

      background: isSunnyDay ? "#dedede" : "#202020",
      color: isSunnyDay ? "#000" : "#fff",
    }).then(res => {
      if (res.isConfirmed) {
        createBackup();
      }
    });
  }

  function infoAboutImportArchives(): void {
    Dialog.fire({
      title: "Importante",
      text: "Si deseas importar archivos '.txt', debes dirigirte a 'C:\\Users\\tu-usuario\\Documents\\lyra' y colocarlos dentro 'lyra'.",
      icon: "info",
      showCancelButton: false,
      confirmButtonColor: "#ffffff0",
      confirmButtonText: "OK",
      background: isSunnyDay ? "#dedede" : "#202020",
      color: isSunnyDay ? "#000" : "#fff",
    });
  }

  function infoAboutImportBackup(): void {
    Dialog.fire({
      title: "Importante",
      text: "Si deseas importar una copia de seguridad, debes dirigirte a 'C:\\Users\\tu-usuario\\Documents' buscar la carpeta 'lyra-backup' y modificar el nombre por 'lyra'.",
      icon: "info",
      showCancelButton: false,
      confirmButtonColor: "#ffffff0",
      confirmButtonText: "OK",
      background: isSunnyDay ? "#dedede" : "#202020",
      color: isSunnyDay ? "#000" : "#fff",
    
    });
  }

  return (
    <MainContainer>
      <section className="w-full max-w-[650px] justify-center items-center flex flex-col h-full gap-y-10 ">
        <div className="flex flex-col gap-y-4 justify-start items-center w-full mt-6 border rounded-md border-gray-500 p-4">
          <p className="w-full text-start text-lg">Importar archivos</p>
          <div className="w-full justify-start items-center flex">
            <div
              className="flex justify-center gap-x-8 items-center duration-75 bg-gray-700 w-64 rounded-md font-semibold text-white h-20"
              onClick={infoAboutImportArchives}
            >
              <p className="text-lg">importar</p>
              <FileIcon size={32} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-4 justify-start items-center w-full border rounded-md border-gray-500 p-4">
          <p
            className={twMerge(
              backupDate == "nunca" || isLoading ? "opacity-0" : "opacity-100",
              "w-full text-start text-md"
            )}
          >
            Última copia de seguridad creada a las {backupDate}
          </p>

          <div className="w-full justify-between items-center flex">
            {isLoading ? (
              <div className="flex justify-center gap-x-8 items-center duration-75 bg-indigo-600 w-64 rounded-md font-semibold text-white h-20">
                <p className="text-lg">creando...</p>
                <BackupIcon size={32} />
              </div>
            ) : backupCreated ? (
              <div className="flex h-20 justify-center items-center duration-75 bg-green-600 opacity-80 w-64 py-2 rounded-md gap-x-8 font-semibold text-white">
                <p className="text-lg">copia creada</p>
                <BackupIcon size={32} />
              </div>
            ) : (
              <button
                onClick={infoAboutBackup}
                className="flex justify-center items-center duration-75 bg-indigo-600 hover:bg-indigo-500 cursor-pointer w-64 rounded-md gap-x-8 font-semibold text-white h-20"
              >
                <p className="text-lg">
                  crear copia <br /> de seguridad
                </p>
                <BackupIcon size={32} />
              </button>
            )}
            <button
              onClick={infoAboutImportBackup}
              className="flex justify-center items-center duration-75 bg-gray-700 hover:bg-gray-5bg-gray-700 cursor-pointer w-64 rounded-md gap-x-8 font-semibold text-white h-20"
            >
              <p className="text-lg">
                importar copia <br /> de seguridad
              </p>
              <ImportIcon size={32} />
            </button>
          </div>
          <div
            className={twMerge(
              backupDate == "nunca" ? "opacity-0" : "opacity-100",
              "w-full text-start text-md flex flex-col"
            )}
          >
            <p>El respaldo se haya en:</p>
            <address className="select-text">
              C:\Users\tu-usuario\Documents\lyra-backup
            </address>
          </div>
        </div>
      </section>
    </MainContainer>
  );
}

export default Backup;
