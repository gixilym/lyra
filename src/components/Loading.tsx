import { twMerge } from "tailwind-merge";
import { themes } from "../utils/helpers";
import type { Component } from "../utils/types";
import translations from "../translate/dictionary";

function Loading(): Component {
  const { isSunnyDay } = themes();
  const d = translations();
  return (
    <p
      className={twMerge(
        isSunnyDay ? "text-black/70" : "text-gray-300",
        "text-lg w-full text-center"
      )}
    >
      {d.Loading}
    </p>
  );
}

export default Loading;
