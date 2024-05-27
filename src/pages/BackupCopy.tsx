import { twMerge } from "tailwind-merge";
import MainContainer from "../components/MainContainer";
import translations from "../utils/dictionary";
import { themes } from "../utils/helpers";
import type { Component } from "../utils/types";

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
