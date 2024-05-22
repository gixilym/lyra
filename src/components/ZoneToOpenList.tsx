import type { Component, Match } from "../utils/types";
import { useState } from "react";
import { navigation } from "../utils/helpers";
import { motion } from "framer-motion";
import { useMatch } from "react-router-dom";
import { PAGES } from "../utils/consts";

function ZoneToOpenList(): Component {
  const { goTo } = navigation(),
    [showMessage, setShowMessage] = useState<boolean>(true),
    messageDisplayed: string | null = localStorage.getItem("list-msg"),
    match: Match = useMatch(PAGES.file),
    pathIsFile: boolean = PAGES.file == match?.pathname;

  if (messageDisplayed) {
    return (
      <div
        onMouseEnter={() => goTo(PAGES.list)}
        className="absolute bottom-0 left-0 w-16 h-48 text-transparent bg-transparent"
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
        className="absolute bottom-0 left-0 bg-indigo-100 w-28 h-40 text-black rounded-tr-lg pt-1 px-1.5 flex flex-col justify-start items-center gap-y-3"
      >
        <p className="text-center text-black font-semibold text-md">
          ve a la lista colocando el cursor aquí
        </p>
        <button
          onClick={() => {
            setShowMessage(false);
            localStorage.setItem("list-msg", "true");
          }}
          className="bg-green-400 text-gray-800 border-2 border-green-600 rounded-lg px-5 py-1 font-semibold text-lg duration-75"
        >
          OK
        </button>
      </motion.div>
    );
  }
}

export default ZoneToOpenList;
