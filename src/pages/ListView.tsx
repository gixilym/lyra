import { useState } from "react";
import Form from "../components/Form";
import ListContainer from "../components/ListContainer";
import ListFiles from "../components/ListFiles";
import type { Component } from "../utils/types";

function ListView(): Component {
  const [searchItem, setSearchItem] = useState<string>("");
  const [paperIsOpen, setPaperIsOpen] = useState<boolean>(false);

  return (
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
  );
}

export default ListView;
