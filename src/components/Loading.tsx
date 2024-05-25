import { twMerge } from "tailwind-merge";
import { themes } from "../utils/helpers";
import type { Component } from "../utils/types";

function Loading(): Component {
  const { isSunnyDay } = themes();
  return (
    <p
      className={twMerge(
        isSunnyDay ? "text-black/70" : "text-gray-300",
        "text-lg w-full text-center"
      )}
    >
      Cargando...
    </p>
  );
}

export default Loading;
