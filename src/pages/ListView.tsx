import { useEffect, useState } from "react";
import Form from "../components/Form";
import ListContainer from "../components/ListContainer";
import ListFiles from "../components/ListFiles";
import type { Component } from "../utils/types";
import useConfig from "../hooks/useConfig";
import MainContainer from "../components/MainContainer";

function ListView(): Component {
  const [searchItem, setSearchItem] = useState<string>("");
  const [paperIsOpen, setPaperIsOpen] = useState<boolean>(false);
  const { recoveryUserConfig } = useConfig();

  useEffect(() => {
    recoveryUserConfig();
  }, []);

  return (
    <MainContainer>
      <ListContainer>
        <Form
          setSearchItem={setSearchItem}
          paperIsOpen={paperIsOpen}
          setPaperIsOpen={setPaperIsOpen}
        />
        <ListFiles
          searchItem={searchItem}
          setSearchItem={setSearchItem}
          paperIsOpen={paperIsOpen}
        />
      </ListContainer>
    </MainContainer>
  );
}

export default ListView;
