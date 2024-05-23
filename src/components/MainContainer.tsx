import { type PropsWithChildren } from "react";
import type { Component, Textarea } from "../utils/types";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";
import { invoke } from "@tauri-apps/api";

function MainContainer({ children }: PropsWithChildren): Component {
  const textarea: Textarea = document.querySelector("textarea");
  textarea?.addEventListener("contextmenu", e => e.stopPropagation());
  window.addEventListener("contextmenu", e => e.preventDefault());

  invoke("greet", { name: "sexo tilin" }).then(res => console.info(res));

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
