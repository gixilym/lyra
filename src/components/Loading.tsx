import { twMerge } from "tailwind-merge";
import translations from "../utils/dictionary";
import { themes } from "../utils/helpers";
import type { Component } from "../utils/types";

function Loading(): Component {
  const { isDay } = themes();
  const d = translations();
  return (
    <p
      className={twMerge(
        isDay ? "text-black/70" : "text-gray-300",
        "text-lg w-full text-center"
      )}>
      {d.Loading}
    </p>
  );
}

export default Loading;
