import type { Component } from "../utils/types";
import { useState, useEffect } from "react";
import { navigation } from "../utils/helpers";
import { motion } from "framer-motion";

function ZoneToOpenList(): Component {
  const { goTo } = navigation();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const hasShownMessage = localStorage.getItem("list-msg");
    if (!hasShownMessage) {
      setShowMessage(true);
      localStorage.setItem("list-msg", "true");
    }
  }, []);

  if (!showMessage) {
    return (
      <div
        onMouseEnter={() => goTo("/list")}
        className="absolute bottom-0 left-0  w-32 h-36 text-transparent"
      >
        .
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 5, delay: 1 }}
      onMouseEnter={() => goTo("/list")}
      className="absolute bottom-0 left-0 bg-gray-400 w-32 h-36 text-black rounded-tr-lg py-2 px-1"
    >
      <p className="text-center text-black font-semibold text-md">
        Coloca el mouse aquí
        <br />
        para abrir la lista
      </p>
    </motion.div>
  );
}

export default ZoneToOpenList;
