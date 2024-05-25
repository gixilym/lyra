import { type PropsWithChildren } from "react";
import type { Component, Textarea } from "../utils/types";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";
import { invoke } from "@tauri-apps/api";
import { twMerge } from "tailwind-merge";
import { themes } from "../utils/helpers";

function MainContainer({ children }: PropsWithChildren): Component {
  const { isSunnyDay, isDarkNigth } = themes();
  const textarea: Textarea = document.querySelector("textarea");
  textarea?.addEventListener("contextmenu", e => e.stopPropagation());
  window.addEventListener("contextmenu", e => e.preventDefault());

  invoke("greet", { name: "sexo tilin" }).then(res => console.info(res));

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={twMerge(
        isSunnyDay
          ? "bg-[#e0e0e0] text-gray-800"
          : isDarkNigth
          ? "bg-black text-gray-200/90"
          : "bg-[#1a1a1a] text-gray-200/90",
        " w-[100vw] min-h-screen flex flex-col items-center justify-start gap-y-10"
      )}
    >
      <Header />
      {children}
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </motion.main>
  );
}

export default MainContainer;
