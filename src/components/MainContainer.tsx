import "@fontsource/ia-writer-duo";
import "@fontsource/sarabun";
import listenCommands from "bind-mousetrap-global";
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
  const fontFamily = myFontVal(),
    { bindGlobal: listen }: any = commands,
    { isSunnyDay, isDarkNigth } = themes(),
    textarea: Textarea = document.querySelector("textarea");

  document.body.spellcheck = false;
  listen("f11", () => toggleFullScreen());
  addEventListener("contextmenu", (e: Event) => e.preventDefault());
  textarea?.addEventListener("contextmenu", (e: Event) => e.stopPropagation());

  return (
    <main
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
    </main>
  );
}

export default MainContainer;

type Textarea = HTMLTextAreaElement | null;
