import { twMerge } from "tailwind-merge";
import translations from "../utils/dictionary";
import { themes } from "../utils/helpers";
import type { Component } from "../utils/types";

function Placeholder(): Component {
  const d = translations();
  const { isDay } = themes();

  return (
    <p
      className={twMerge(
        isDay ? "!text-black" : "!text-gray-300/90",
        "absolute text-lg md:text-xl"
      )}>
      {d.StartTyping}
    </p>
  );
}

export default Placeholder;
