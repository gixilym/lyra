import Form from "../components/Form";
import ListContainer from "../components/ListContainer";
import ListFiles from "../components/ListFiles";
import type { Component } from "../utils/types";
import MainContainer from "../components/MainContainer";

function ListView(): Component {
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
