import { useEffect, useState } from "react";
import useFile from "../hooks/useFile";
import useStorage from "../hooks/useStorage";
import { configStore } from "../store/configStore";
import type { Component } from "../utils/types";
import Form from "./Form";
import { fileStore } from "../store/fileStore";
import ListFiles from "./ListFiles";
import Loading from "./Loading";
import MainContainer from "./MainContainer";

function ListContainer(): Component {
  const { getFiles } = useFile(),
    { setItem } = useStorage(),
    { paperIsOpen } = configStore(),
    [loading, setLoading] = useState<boolean>(true),
    { setFiles, fileIsEdited, files } = fileStore();

  useEffect(() => {
    getFiles()
      .then(files => {
        setFiles(files);
        setItem("files", JSON.stringify(files));
      })
      .finally(() => setLoading(false));
  }, [fileIsEdited, paperIsOpen]);

  return (
    <MainContainer>
      <div className="flex flex-row justify-center items-start w-full h-full">
        <div className="w-full max-w-[580px] h-5/6 overflow-x-hidden overflow-y-visible flex flex-col justify-center items-center">
          <Form />
          {loading ? <Loading /> : <ListFiles arr={files} />}
        </div>
      </div>
    </MainContainer>
  );
}

export default ListContainer;
