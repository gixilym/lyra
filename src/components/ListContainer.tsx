import type { PropsWithChildren } from "react";
import type { Component } from "../utils/types";

function ListContainer({ children }: PropsWithChildren): Component {
  return (
    <div className="flex flex-row justify-center items-start w-full h-full">
      <div className="w-full max-w-[580px] h-5/6 overflow-x-hidden overflow-y-visible flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
}

export default ListContainer;
