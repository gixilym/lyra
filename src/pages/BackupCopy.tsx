import type { Component } from "../utils/types";
import MainContainer from "../components/MainContainer";
import { twMerge } from "tailwind-merge";
import { themes } from "../utils/helpers";

function BackupCopy(): Component {
  const { isSunnyDay } = themes();
  return (
    <MainContainer>
      <p
        className={twMerge(
          isSunnyDay ? "text-black/70" : "text-white",
          "text-lg"
        )}
      >
        Copia de seguridad
      </p>
    </MainContainer>
  );
}

export default BackupCopy;
