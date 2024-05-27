import { type PropsWithChildren } from "react";
import type { Component, Textarea } from "../utils/types";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";
import { twMerge } from "tailwind-merge";
import { themes } from "../utils/helpers";
import commands from "mousetrap";
import listenCommands from "bind-mousetrap-global";
import { toggleFullScreen } from "../utils/commands";

listenCommands(commands);

function MainContainer({ children }: PropsWithChildren): Component {
  const { bindGlobal: listen }: any = commands;
  const { isSunnyDay, isDarkNigth } = themes();
  const textarea: Textarea = document.querySelector("textarea");
  textarea?.addEventListener("contextmenu", e => e.stopPropagation());
  window.addEventListener("contextmenu", e => e.preventDefault());

  listen("f11", () => toggleFullScreen());

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
