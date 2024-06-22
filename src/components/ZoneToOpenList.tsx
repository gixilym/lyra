import { motion } from "framer-motion";
import { useState } from "react";
import { useMatch } from "react-router-dom";
import useStorage from "../hooks/useStorage";
import { PAGES } from "../utils/consts";
import translations from "../utils/dictionary";
import { navigation } from "../utils/helpers";
import type { Component, Match } from "../utils/types";

function ZoneToOpenList(): Component {
  const { goTo } = navigation(),
    { getItem, setItem } = useStorage(),
    [showMessage, setShowMessage] = useState<boolean>(true),
    messageDisplayed: boolean = Boolean(getItem("list-msg", "false")),
    match: Match = useMatch(PAGES.file),
    pathIsFile: boolean = PAGES.file == match?.pathname,
    d = translations();

  if (messageDisplayed) {
    return (
      <div
        onMouseEnter={() => goTo(PAGES.list)}
        className="fixed bottom-0 left-0 w-16 h-48 text-transparent bg-transparent"
      >
        .
      </div>
    );
  } else if (pathIsFile && showMessage) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 3 }}
        className="absolute bottom-0 left-0 bg-indigo-100 w-28 h-48 text-black rounded-tr-lg pt-1 px-1.5 flex flex-col justify-start items-center gap-y-3 border-2"
      >
        <p className="text-center text-black/70 font-semibold text-md">
          {d.GoToTheListByPlacingTheCursorHere}
        </p>
        <button
          onClick={() => {
            setShowMessage(false);
            setItem("list-msg", "true");
          }}
          className="bg-green-400 text-black/70 border-2 border-green-600 rounded-lg px-5 py-1 font-semibold text-lg duration-75"
        >
          OK
        </button>
      </motion.div>
    );
  }
}

export default ZoneToOpenList;
