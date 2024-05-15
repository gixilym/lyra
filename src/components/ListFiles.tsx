import { type Dispatch, type SetStateAction, useEffect } from "react";
import { useStore } from "../utils/store";
import ItemFile from "./ItemFile";
import type { Component } from "../utils/types";
import NoMatches from "./NoMatches";
import useFile from "../hooks/useFile";

function ListFiles(props: Props): Component {
  const { paperIsOpen } = props,
    { getFiles } = useFile(),
    { files, setFiles, userConfig } = useStore(),
    formatFiles: Array<string> = files.filter(
      item => !userConfig.paper.includes(item)
    );

  useEffect(() => {
    getFiles()
      .then(everyFiles => setFiles(everyFiles))
      .catch(err => console.error(`Error: ${err.message} in 'getFiles'`));
  }, [files]);

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
    <ol className="w-full h-6/6 select-none flex flex-col gap-y-2  justify-center items-start">
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

/*
!filtrar resultados
  showSearchResults: boolean = searchItem != "",
  filterSearches = formatFiles.filter((name: string) =>
    name.includes(searchItem)
  );
  function renderSearchResults() {
    if (filterSearches.length > 0) {
      return filterSearches.map((fileName: string) => (
        <ItemFile fileName={fileName} key={fileName} />
      ));
    } else return <NoMatches />;
  }

*/
