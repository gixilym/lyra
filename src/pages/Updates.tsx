import MainContainer from "../components/MainContainer";
import translations from "../utils/dictionary";
import type { Component } from "../utils/types";

function Updates(): Component {
  const d = translations();

  return (
    <MainContainer>
      <p>{d.Updates}</p>
    </MainContainer>
  );
}

export default Updates;
