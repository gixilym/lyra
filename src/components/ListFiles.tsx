import { animated, useSpring } from "@react-spring/web";
import { memo, useEffect } from "react";
import usePreferences from "../hooks/usePreferences";
import { configStore } from "../store/configStore";
import { searchStore } from "../store/searchStore";
import { len, normalize } from "../utils/helpers";
import type { Component } from "../utils/types";
import ItemFile from "./ItemFile";
import NoFiles from "./NoFiles";
import NoMatches from "./NoMatches";

const ListFiles = memo(({ arr }: Props): Component => {
  const { search, resetSearch, order } = searchStore(),
    { paperIsOpen } = configStore(),
    { myPaper } = usePreferences(),
    animation = {
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 200 },
    },
    [styles, api] = useSpring(() => animation);

  useEffect(() => resetSearch(), [paperIsOpen]);

  useEffect(() => {
    api.start(animation);
  }, [search, paperIsOpen, myPaper()]);

  function renderFiles(): Component {
    const { myPaper } = usePreferences(),
      allFiles = arr.filter((f: string) => !myPaper().includes(f)),
      files: string[] = paperIsOpen
        ? myPaper().filter(f => normalize(f).includes(normalize(search)))
        : allFiles.filter(f => normalize(f).includes(normalize(search)));

    if (len(files) === 0) {
      if (len(normalize(search)) > 0) return <NoMatches />;
      return <NoFiles />;
    }

    const sorted: string[] = files.sort((a, b) =>
      order ? a.localeCompare(b) : b.localeCompare(a)
    );

    return sorted.map((n: string) => <ItemFile fileName={n} key={n} />);
  }

  return (
    <animated.ol
      style={styles}
      className="grid grid-cols-1 gap-y-2 place-items-center w-full overflow-hidden pb-20">
      {renderFiles()}
    </animated.ol>
  );
});

export default ListFiles;

interface Props {
  arr: string[];
}
