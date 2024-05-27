import { useEffect, useState, useMemo } from "react";
import { fileStore } from "../store/fileStore";
import { configStore } from "../store/configStore";
import ItemFile from "./ItemFile";
import type { Component } from "../utils/types";
import useFile from "../hooks/useFile";
import NoFiles from "./NoFiles";
import Loading from "./Loading";
import { paperFiles } from "../utils/helpers";

function ListFiles(): Component {
  const { getFiles } = useFile(),
    { paperIsOpen } = configStore(),
    paper = paperFiles(),
    { files, setFiles, fileIsEdited } = fileStore(),
    [loading, setLoading] = useState<boolean>(true),
    formatFiles: string[] = useMemo(
      () => files.filter((f: string) => !paper.includes(f)),
      [files, paper]
    );

  useEffect(() => {
    getFiles()
      .then(userFiles => setFiles(userFiles))
      .finally(() => setLoading(false));
  }, [fileIsEdited, paperIsOpen]);

  function renderFiles(): Component {
    const arr: string[] = paperIsOpen ? paper : formatFiles;
    const hasFiles: boolean = arr.length > 0;
    if (!hasFiles) return <NoFiles />;
    else return arr.map((n: string) => <ItemFile fileName={n} key={n} />);
  }

  //!problema de scroll en lista

  if (loading) return <Loading />;
  else
    return (
      <ol className="w-full h-6/6 mt-10 flex flex-col gap-y-2 justify-center items-center">
        {renderFiles()}
      </ol>
    );
}

export default ListFiles;
