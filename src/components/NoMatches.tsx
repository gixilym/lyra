import type { Component } from "../utils/types";
import { motion } from "framer-motion";
import translations from "../translate/dictionary";

function NoMatches(): Component {
  const dictionary = translations();

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="text-lg text-gray-400"
    >
      {dictionary.NothingHere}
    </motion.p>
  );
}

export default NoMatches;
