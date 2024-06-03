import { copyFile, createDir, exists } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";
import {
  DatabaseBackup as BackupIcon,
  FileUp as FileIcon,
  FolderUp as ImportIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import Dialog from "sweetalert2";
import { twMerge } from "tailwind-merge";
import MainContainer from "../components/MainContainer";
import useFile from "../hooks/useFile";
import useLoading from "../hooks/useLoading";
import useStorage from "../hooks/useStorage";
import { BACKUP_FOLDER, BASE_DIRECTORY } from "../utils/consts";
import translations from "../utils/dictionary";
import {
  backupExists as backupExistsFn,
  getDate,
  themes,
} from "../utils/helpers";
import type { Component } from "../utils/types";

function Backup(): Component {
  const d = translations(),
    { isSunnyDay } = themes(),
    { getFilePath } = useFile(),
    { getItem, setItem } = useStorage(),
    { startLoading, isLoading, finishLoading } = useLoading(),
    files: string[] = JSON.parse(getItem("files") as string) ?? [],
    [backupExists, setBackupExists] = useState<boolean>(false),
    [backupCreated, setBackupCreated] = useState<boolean>(false),
    [backupDate, setBackupDate] = useState<string>(
      () => getItem("backup-date") ?? "nunca"
    );

  useEffect(() => {
    (async function () {
      const res = await backupExistsFn();
      setBackupExists(res);
    })();
  }, []);

  async function createBackup(): Promise<void> {
    startLoading();
    const backupExists: boolean = await exists(BACKUP_FOLDER, BASE_DIRECTORY);
    if (!backupExists) {
      createDir(BACKUP_FOLDER, BASE_DIRECTORY)
        .then(() => copyFiles())
        .then(() => setBackupExists(true))
        .catch(err => console.error(`Error creando backup: ${err.message}`));
    } else copyFiles();
  }

  function saveDate(): void {
    const date: string = getDate();
    setItem("backup-date", date);
    setBackupDate(date);
  }

  async function copyFiles(): Promise<() => void> {
    for await (const file of files) {
      const { pathFile: originalFilePath } = await getFilePath(file);
      const backupFilePath: string = await join(BACKUP_FOLDER, `${file}.txt`);
      copyFile(originalFilePath, backupFilePath, BASE_DIRECTORY).catch(err =>
        console.error(`Error copiando ${file}: ${err.message}`)
      );
    }
    saveDate();
    const timerOne = setTimeout(() => finishLoading(), 2000);
    const timerTwo = setTimeout(() => {
      setBackupCreated(true);
      setBackupExists(true);
    }, 2000);
    return () => {
      clearTimeout(timerOne);
      clearTimeout(timerTwo);
    };
  }

  function infoAboutBackup(): void {
    Dialog.fire({
      title: d.Important,
      text: d.InfoAboutBackup,
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
      title: d.Important,
      text: d.IfYouWantToImportFiles,
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
      title: d.Important,
      text: d.IfYouWantToImportBackup,
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
          <p className="w-full text-start text-lg">{d.ImportRecords}</p>
          <div className="w-full justify-start items-center flex">
            <div
              className="flex justify-center gap-x-8 items-center duration-75 bg-gray-700 w-64 rounded-md font-semibold text-white h-20"
              onClick={infoAboutImportArchives}
            >
              <p className="text-md">{d.Import}</p>
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
            {d.LastBackupCreatedAt} {backupDate}
          </p>

          <div className="w-full justify-between items-center flex">
            {isLoading ? (
              <div className="flex justify-center gap-x-8 items-center duration-75 bg-indigo-600 w-64 rounded-md font-semibold text-white h-20">
                <p className="text-lg">{d.Creating}</p>
                <BackupIcon size={32} />
              </div>
            ) : backupCreated ? (
              <div className="flex h-20 justify-center items-center duration-75 bg-green-600 opacity-80 w-64 py-2 rounded-md gap-x-8 font-semibold text-white">
                <p className="text-lg">{d.CopyCreated}</p>
                <BackupIcon size={32} />
              </div>
            ) : (
              <button
                onClick={infoAboutBackup}
                className="flex justify-center items-center duration-75 bg-indigo-600 hover:bg-indigo-500 cursor-pointer w-64 rounded-md gap-x-8 font-semibold text-white h-20 px-2"
              >
                <p className="text-md">{d.CreateBackup}</p>
                <BackupIcon size={32} />
              </button>
            )}
            <button
              onClick={infoAboutImportBackup}
              className="flex justify-center items-center duration-75 bg-gray-700 hover:bg-gray-gray-700 cursor-pointer w-64 rounded-md gap-x-8 font-semibold text-white h-20 px-2"
            >
              <p className="text-md">{d.ImportBackup}</p>
              <ImportIcon size={32} />
            </button>
          </div>
          {backupExists && (
            <div
              className={twMerge(
                backupDate == "nunca" ? "opacity-0" : "opacity-100",
                "w-full text-start text-md flex flex-col"
              )}
            >
              <p>{d.TheBackupIsIn}:</p>
              <address className="select-text">
                C:\Users\{d.YourUser}\Documents\{BACKUP_FOLDER}
              </address>
            </div>
          )}
        </div>
      </section>
    </MainContainer>
  );
}

export default Backup;
