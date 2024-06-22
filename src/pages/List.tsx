import { useEffect, useState } from "react";
import useFile from "../hooks/useFile";
import { configStore } from "../store/configStore";
import type { Component } from "../utils/types";
import { fileStore } from "../store/fileStore";
import Loading from "../components/Loading";
import ListFiles from "../components/ListFiles";
import Form from "../components/Form";
import MainContainer from "../components/MainContainer";

function List(): Component {
  const { getFiles } = useFile(),
    { paperIsOpen } = configStore(),
    { setFiles, fileIsEdited, files } = fileStore(),
    [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getFiles()
      .then(files => setFiles(files))
      .finally(() => setLoading(false));
  }, [fileIsEdited, paperIsOpen]);

  return (
    <MainContainer>
      <div className="flex flex-row justify-center items-start w-full h-full">
        <div className="w-full max-w-[580px] h-5/6 overflow-x-hidden overflow-y-visible flex flex-col justify-center items-center gap-y-8">
          <Form />
          {loading ? <Loading /> : <ListFiles arr={files} />}
        </div>
      </div>
    </MainContainer>
  );
}

export default List;
