import { useEffect, useMemo, useState } from "react";
import useFile from "../hooks/useFile";
import { configStore } from "../store/configStore";
import { fileStore } from "../store/fileStore";
import { paperFiles } from "../utils/helpers";
import type { Component } from "../utils/types";
import ItemFile from "./ItemFile";
import Loading from "./Loading";
import NoFiles from "./NoFiles";
import useStorage from "../hooks/useStorage";

function ListFiles(): Component {
  const { getFiles } = useFile(),
    { paperIsOpen } = configStore(),
    paper = paperFiles(),
    { files, setFiles, fileIsEdited } = fileStore(),
    { setItem } = useStorage(),
    [loading, setLoading] = useState<boolean>(true),
    formatFiles: string[] = useMemo(
      () => files.filter((f: string) => !paper.includes(f)),
      [files, paper]
    );

  useEffect(() => {
    getFiles()
      .then(files => {
        setFiles(files);
        setItem("files", JSON.stringify(files));
      })
      .finally(() => setLoading(false));
  }, [fileIsEdited, paperIsOpen]);

  function renderFiles(): Component {
    const arr: string[] = paperIsOpen ? paper : formatFiles;
    const hasFiles: boolean = arr.length > 0;
    if (!hasFiles) return <NoFiles />;
    return arr.map((n: string) => <ItemFile fileName={n} key={n} />);
  }

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
