import { configStore } from "../store/configStore";
import type { Component } from "../utils/types";
import { motion } from "framer-motion";

function NoFiles(): Component {
  const { paperIsOpen } = configStore();

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="text-lg text-gray-300/90"
    >
      {paperIsOpen ? "papelera vacía" : "añade tu primer registro"}
    </motion.p>
  );
}

export default NoFiles;
