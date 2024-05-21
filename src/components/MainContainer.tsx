import { type PropsWithChildren } from "react";
import type { Component } from "../utils/types";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";

function MainContainer({ children }: PropsWithChildren): Component {
  addEventListener("contextmenu", event => event.preventDefault());

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-[100vw] min-h-screen flex flex-col items-center justify-start gap-y-10"
    >
      <Header />
      {children}
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </motion.main>
  );
}

export default MainContainer;
