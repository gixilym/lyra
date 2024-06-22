import { twMerge } from "tailwind-merge";
import translations from "../utils/dictionary";
import { themes } from "../utils/helpers";
import type { Component } from "../utils/types";

function NoMatches(): Component {
  const d = translations();
  const { isSunnyDay } = themes();

  return (
    <p
      className={twMerge(
        isSunnyDay ? "text-black/70" : "text-gray-400",
        "text-lg"
      )}
    >
      {d.NothingHere}
    </p>
  );
}

export default NoMatches;
