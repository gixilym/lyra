import { type Dispatch, type SetStateAction, useEffect } from "react";
import { fileStore } from "../store/fileStore";
import { configStore } from "../store/configStore";
import ItemFile from "./ItemFile";
import type { Component } from "../utils/types";
import NoMatches from "./NoMatches";
import useFile from "../hooks/useFile";

function ListFiles(props: Props): Component {
  const { paperIsOpen } = props,
    { getFiles } = useFile(),
    { userConfig } = configStore(),
    { files, setFiles, fileIsEdited } = fileStore(),
    formatFiles: string[] = files.filter(
      name => !userConfig.paper.includes(name)
    );

  useEffect(() => {
    getFiles().then(everyFiles => setFiles(everyFiles));
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

  return (
    <ol className="w-full h-6/6 select-none flex flex-col gap-y-2  justify-center items-center">
      {renderFiles()}
    </ol>
  );
}

interface Props {
  searchItem: string;
  paperIsOpen: boolean;
  setSearchItem: Dispatch<SetStateAction<string>>;
}

export default ListFiles;
