import { useEffect } from "react";
import Form from "../components/Form";
import ListContainer from "../components/ListContainer";
import ListFiles from "../components/ListFiles";
import type { Component } from "../utils/types";
import useConfig from "../hooks/useConfig";
import MainContainer from "../components/MainContainer";
import useFile from "../hooks/useFile";
import { BASE_DIRECTORY, MAIN_FOLDER } from "../utils/consts";
import { createDir } from "@tauri-apps/api/fs";

function ListView(): Component {
  const { recoveryUserConfig } = useConfig();
  const { fileExists } = useFile();

  async function verga(): Promise<void> {
    const condition: boolean = await fileExists(MAIN_FOLDER, true);

    if (condition) {
      console.log("la carpeta main existe");
      recoveryUserConfig();
    } else {
      createDir(MAIN_FOLDER, BASE_DIRECTORY).then(() => recoveryUserConfig());
      console.log("creando carpeta main...");
    }
  }

  useEffect(() => {
    verga();
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
