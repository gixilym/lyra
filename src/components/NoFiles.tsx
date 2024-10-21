import { twMerge } from "tailwind-merge";
import { configStore } from "../store/configStore";
import translations from "../utils/dictionary";
import { themes } from "../utils/helpers";
import type { Component } from "../utils/types";

function NoFiles(): Component {
  const { paperIsOpen } = configStore();
  const { isDay } = themes();
  const d = translations();

  return (
    <p
      className={twMerge(
        isDay ? "text-black/70" : "text-gray-300/90",
        "text-lg"
      )}>
      {paperIsOpen ? d.NothingHere : d.AddYourFirstAnnotation}
    </p>
  );
}

export default NoFiles;
