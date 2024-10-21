import "@fontsource/ia-writer-duo";
import "@fontsource/sarabun";
import listenCommands from "bind-mousetrap-global";
import commands from "mousetrap";
import { type PropsWithChildren } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import usePreferences from "../hooks/usePreferences";
import { toggleFullScreen } from "../utils/commands";
import { PAGES } from "../utils/consts";
import { pathIs, themes } from "../utils/helpers";
import type { Component } from "../utils/types";
import Header from "./Header";

listenCommands(commands);

function MainContainer({ children }: PropsWithChildren): Component {
  const { myFontValue } = usePreferences(),
    { bindGlobal: listen }: any = commands,
    { isDay } = themes(),
    textarea: Textarea = document.querySelector("textarea");

  listen("f11", () => toggleFullScreen());
  addEventListener("contextmenu", (e: Event) => e.preventDefault());
  textarea?.addEventListener("contextmenu", (e: Event) => e.stopPropagation());

  return (
    <main
      className={twMerge(
        isDay ? "bg-[#e0e0e0] text-gray-800" : "bg-[#1a1a1a] text-gray-200/90",
        pathIs(PAGES.file) ? "gap-0" : "gap-y-10 lg:gap-y-20",
        twJoin(
          myFontValue(),
          "w-[100vw] min-h-screen flex flex-col items-center justify-start"
        )
      )}>
      <Header />
      {children}
    </main>
  );
}

export default MainContainer;

type Textarea = HTMLTextAreaElement | null;
