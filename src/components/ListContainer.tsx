import type { PropsWithChildren } from "react";
import type { Component } from "../utils/types";
import { AnimatePresence } from "framer-motion";

function ListContainer({ children }: PropsWithChildren): Component {
  return (
    <div className="flex flex-row justify-center items-center w-full h-full">
      <AnimatePresence>
        <aside className="bg-transparent w-full max-w-[580px] h-5/6 overflow-x-hidden overflow-y-visible flex flex-col justify-center gap-y-8 items-center bg-red-50">
          {children}
        </aside>
      </AnimatePresence>
    </div>
  );
}

export default ListContainer;
