import { type PropsWithChildren } from "react";
import type { Component } from "../utils/types";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

function ListContainer({ children }: PropsWithChildren): Component {
  return (
    <div className="flex flex-row justify-center items-center w-full h-screen">
      <AnimatePresence>
        <motion.aside
          className="bg-transparent w-full max-w-[580px] h-5/6 overflow-x-hidden overflow-y-visible flex flex-col justify-start gap-y-8 items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.aside>
      </AnimatePresence>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default ListContainer;
