import { useEffect } from "react";
import Form from "../components/Form";
import ListContainer from "../components/ListContainer";
import ListFiles from "../components/ListFiles";
import type { Component } from "../utils/types";
import useConfig from "../hooks/useConfig";
import MainContainer from "../components/MainContainer";

function ListView(): Component {
  const { recoveryUserConfig } = useConfig();

  useEffect(() => {
    recoveryUserConfig();
  }, []);

  return (
    <MainContainer>
      <ListContainer>
        <Form />
        <ListFiles />
      </ListContainer>
    </MainContainer>
  );
}

export default ListView;
