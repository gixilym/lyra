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
      .then(files => setFiles(files))
      .finally(() => setLoading(false));
  }, [fileIsEdited, paperIsOpen]);

  function renderFiles(): Component {
    const arr: string[] = paperIsOpen ? paper : formatFiles;
    const hasFiles: boolean = arr.length > 0;
    if (!hasFiles) return <NoFiles />;
    return arr.map((n: string) => <ItemFile fileName={n} key={n} />);
  }

  //! que no deje añadir notas si esta la papelera abierta
  //! actulizar la v1.0.0

  if (loading) return <Loading />;
  return (
    <section className="w-full overflow-y-auto max-h-[400px] mt-8">
      <ol className="grid grid-cols-1 gap-y-2 place-items-center w-full overflow-hidden">
        {renderFiles()}
      </ol>
    </section>
  );
}

export default ListFiles;
