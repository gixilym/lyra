import type { Component } from "../utils/types";
import MainContainer from "../components/MainContainer";
import { twMerge } from "tailwind-merge";
import { themes } from "../utils/helpers";
import translations from "../translate/dictionary";

function BackupCopy(): Component {
  const { isSunnyDay } = themes();
  const d = translations();

  return (
    <MainContainer>
      <p
        className={twMerge(
          isSunnyDay ? "text-black/70" : "text-white",
          "text-lg"
        )}
      >
        {d.Backup}
      </p>
    </MainContainer>
  );
}

export default BackupCopy;
