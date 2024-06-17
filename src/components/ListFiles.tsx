import { useEffect, useMemo, useState } from "react";
import useFile from "../hooks/useFile";
import useStorage from "../hooks/useStorage";
import { configStore } from "../store/configStore";
import { fileStore } from "../store/fileStore";
import { paperFiles } from "../utils/helpers";
import type { Component } from "../utils/types";
import ItemFile from "./ItemFile";
import Loading from "./Loading";
import NoFiles from "./NoFiles";

function ListFiles(): Component {
  const { getFiles } = useFile(),
    { setItem } = useStorage(),
    { paperIsOpen } = configStore(),
    [loading, setLoading] = useState<boolean>(true),
    { files: everyFiles, setFiles, fileIsEdited } = fileStore();

  useEffect(() => {
    getFiles()
      .then(files => {
        setFiles(files);
        setItem("files", JSON.stringify(files));
      })
      .finally(() => setLoading(false));
  }, [fileIsEdited, paperIsOpen]);

  const renderFiles: Component = useMemo(() => {
    const paper = paperFiles();
    const files = everyFiles.filter((f: string) => !paper.includes(f));
    const arr: string[] = paperIsOpen ? paper : files;
    if (arr.length == 0) return <NoFiles />;
    return arr.map((n: string) => <ItemFile fileName={n} key={n} />);
  }, [everyFiles]);

  if (loading) return <Loading />;
  return (
    <section className="w-full overflow-y-auto max-h-[400px] mt-8">
      <ol className="grid grid-cols-1 gap-y-2 place-items-center w-full overflow-hidden">
        {renderFiles}
      </ol>
    </section>
  );
}

export default ListFiles;
