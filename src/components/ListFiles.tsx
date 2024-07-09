import { memo } from "react";
import { configStore } from "../store/configStore";
import ItemFile from "./ItemFile";
import NoFiles from "./NoFiles";
import type { Component } from "../utils/types";
import usePreferences from "../hooks/usePreferences";

const ListFiles = memo(({ arr }: { arr: string[] }): Component => {
  function renderFiles(): Component {
    const { paperIsOpen } = configStore(),
      { myPaper } = usePreferences(),
      everyFiles = arr.filter((f: string) => !myPaper().includes(f)),
      files: string[] = paperIsOpen ? myPaper() : everyFiles;
    if (files.length == 0) return <NoFiles />;
    return files.map((n: string) => <ItemFile fileName={n} key={n} />);
  }

  return (
    <ol className="grid grid-cols-1 gap-y-2 place-items-center w-full overflow-hidden pb-20">
      {renderFiles()}
    </ol>
  );
});

export default ListFiles;
