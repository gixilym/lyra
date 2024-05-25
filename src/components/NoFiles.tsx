import { twMerge } from "tailwind-merge";
import { configStore } from "../store/configStore";
import { themes } from "../utils/helpers";
import type { Component } from "../utils/types";
import { motion } from "framer-motion";

function NoFiles(): Component {
  const { paperIsOpen } = configStore();
  const { isSunnyDay } = themes();

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={twMerge(
        isSunnyDay ? "text-black/70" : "text-gray-300/90",
        "text-lg"
      )}
    >
      {paperIsOpen ? "papelera vacía" : "añade tu primer registro"}
    </motion.p>
  );
}

export default NoFiles;
