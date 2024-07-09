import "@fontsource/ia-writer-duo";
import "@fontsource/sarabun";
import listenCommands from "bind-mousetrap-global";
import commands from "mousetrap";
import { type PropsWithChildren } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import { toggleFullScreen } from "../utils/commands";
import { themes } from "../utils/helpers";
import type { Component } from "../utils/types";
import Footer from "./Footer";
import Header from "./Header";
import usePreferences from "../hooks/usePreferences";

listenCommands(commands);

function MainContainer({ children }: PropsWithChildren): Component {
  const { myFontValue } = usePreferences(),
    { bindGlobal: listen }: any = commands,
    { isSunnyDay, isDarkNigth } = themes(),
    textarea: Textarea = document.querySelector("textarea");

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
          myFontValue(),
          "w-[100vw] min-h-screen flex flex-col items-center justify-start lg:gap-y-20"
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
