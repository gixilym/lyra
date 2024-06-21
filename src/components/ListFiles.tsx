import { memo } from "react";
import { configStore } from "../store/configStore";
import { paperFiles } from "../utils/helpers";
import ItemFile from "./ItemFile";
import NoFiles from "./NoFiles";
import type { Component } from "../utils/types";

const ListFiles = memo(({ arr }: { arr: string[] }): Component => {
  function renderFiles(): Component {
    const { paperIsOpen } = configStore(),
      paper = paperFiles(),
      everyFiles = arr.filter((f: string) => !paper.includes(f)),
      files: string[] = paperIsOpen ? paper : everyFiles;
    if (files.length == 0) return <NoFiles />;
    return files.map((n: string) => <ItemFile fileName={n} key={n} />);
  }

  return (
    <ol className="grid grid-cols-1 gap-y-2 place-items-center w-full overflow-hidden">
      {renderFiles()}
    </ol>
  );
});

export default ListFiles;
