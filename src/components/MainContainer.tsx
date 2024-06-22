import "@fontsource/ia-writer-duo";
import "@fontsource/sarabun";
import listenCommands from "bind-mousetrap-global";
import { motion } from "framer-motion";
import commands from "mousetrap";
import { type PropsWithChildren } from "react";

import { twJoin, twMerge } from "tailwind-merge";
import { toggleFullScreen } from "../utils/commands";
import { myFontVal, themes } from "../utils/helpers";
import type { Component } from "../utils/types";
import Footer from "./Footer";
import Header from "./Header";

listenCommands(commands);

function MainContainer({ children }: PropsWithChildren): Component {
  const fontFamily = myFontVal();
  const { bindGlobal: listen }: any = commands;
  const { isSunnyDay, isDarkNigth } = themes();

  document.body.spellcheck = false;
  addEventListener("contextmenu", (e: Event) => e.preventDefault());
  listen("f11", () => toggleFullScreen());
  document
    .querySelector("textarea")
    ?.addEventListener("contextmenu", e => e.stopPropagation());

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
        twJoin(
          fontFamily,
          "w-[100vw] min-h-screen flex flex-col items-center justify-start gap-y-10"
        )
      )}
    >
      <Header />
      {children}
      <Footer />
      
    </motion.main>
  );
}

export default MainContainer;
