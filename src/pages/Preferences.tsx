import type { Component } from "../utils/types";
import MainContainer from "../components/MainContainer";
import { themes } from "../utils/helpers";
import { twMerge } from "tailwind-merge";

function Preferences(): Component {
  const { isSunnyDay } = themes();
  return (
    <MainContainer>
      <p
        className={twMerge(
          isSunnyDay ? "text-black/70" : "text-white",
          "text-lg"
        )}
      >
        Preferencias
      </p>
    </MainContainer>
  );
}

export default Preferences;
