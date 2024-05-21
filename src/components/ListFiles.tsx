import { useEffect, useState } from "react";
import { fileStore } from "../store/fileStore";
import { configStore } from "../store/configStore";
import ItemFile from "./ItemFile";
import type { Component } from "../utils/types";
import NoMatches from "./NoMatches";
import useFile from "../hooks/useFile";

function ListFiles(): Component {
  const { getFiles } = useFile(),
    { userConfig, paperIsOpen } = configStore(),
    { files, setFiles, fileIsEdited } = fileStore(),
    [loading, setLoading] = useState<boolean>(true),
    formatFiles: string[] = files.filter(
      name => !userConfig.paper.includes(name)
    );

  useEffect(() => {
    getFiles()
      .then(everyFiles => setFiles(everyFiles))
      .then(() => setLoading(false))
      .catch(() => console.error("Error al cargar los archivos"));
  }, [fileIsEdited]);

  function renderFiles() {
    const arr: string[] = paperIsOpen ? userConfig.paper : formatFiles;
    const hasFiles: boolean = arr.length > 0;

    return hasFiles ? (
      arr.map((name: string) => (
        <ItemFile paperIsOpen={paperIsOpen} fileName={name} key={name} />
      ))
    ) : (
      <NoMatches />
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
