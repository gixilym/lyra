import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import translations from "../utils/dictionary";
import { themes } from "../utils/helpers";
import type { Component } from "../utils/types";

function NoMatches(): Component {
  const d = translations();
  const { isSunnyDay } = themes();

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={twMerge(
        isSunnyDay ? "text-black/70" : "text-gray-400",
        "text-lg"
      )}
    >
      {d.NothingHere}
    </motion.p>
  );
}

export default NoMatches;
