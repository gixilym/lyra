import { useEffect, useState } from "react";
import { fileStore } from "../store/fileStore";
import { configStore } from "../store/configStore";
import ItemFile from "./ItemFile";
import type { Component } from "../utils/types";
import useFile from "../hooks/useFile";
import NoFiles from "./NoFiles";

function ListFiles(): Component {
  const { getFiles } = useFile(),
    { userConfig, paperIsOpen } = configStore(),
    { files, setFiles, fileIsEdited } = fileStore(),
    [loading, setLoading] = useState<boolean>(true),
    formatFiles: string[] = files.filter(f => !userConfig.paper.includes(f));

  useEffect(() => {
    getFiles()
      .then(userFiles => setFiles(userFiles))
      .catch(err => console.error("Error obteniendo archivos: ", err.message))
      .finally(() => setLoading(false));
  }, [fileIsEdited]);

  function renderFiles(): Component {
    const arr: string[] = paperIsOpen ? userConfig.paper : formatFiles;
    const hasFiles: boolean = arr.length > 0;

    return hasFiles ? (
      arr.map((name: string) => (
        <ItemFile paperIsOpen={paperIsOpen} fileName={name} key={name} />
      ))
    ) : (
      <NoFiles />
    );
  }

  return loading ? (
    <p className="text-lg text-gray-300 w-full text-center">Cargando...</p>
  ) : (
    <ol className="w-full h-6/6 select-none flex flex-col gap-y-2 justify-center items-center">
      {renderFiles()}
    </ol>
  );
}

export default ListFiles;
