import { join } from "@tauri-apps/api/path";
import toast from "react-hot-toast";
import { type NavigateFunction, useMatch, useNavigate } from "react-router-dom";
import { FOLDER_NAME } from "./consts";

function navigation(): { goTo: (route: string) => void } {
  const navigate: NavigateFunction = useNavigate();
  const goTo = (route: string): void => navigate(route);
  return { goTo };
}

function notification(type: "success" | "error", msg: string): void {
  toast[type](msg, {
    duration: 2000,
    style: { backgroundColor: "#202020", color: "#fff" },
  });
}

async function getFilePath(fileName: string): Promise<{ pathFile: string }> {
  const pathFile: string = await join(FOLDER_NAME, fileName);
  return { pathFile };
}

function nameIsValid(name: string): Boolean {
  const regex: RegExp = /^[a-zA-Z0-9-_ ]+$/;
  const nameIsLong: boolean = name.length > 25;
  const invalidSymbols: boolean = !regex.test(name);

  if (nameIsLong) {
    notification("error", "Nombre demasiado extenso");
    return false;
  }

  if (invalidSymbols) {
    notification("error", "El nombre contiene caracteres inválidos");
    return false;
  }

  return true;
}

function checkNewRoute(route: string) {
  const match = useMatch(route);

  if (!route) throw new Error("route is null or undefined");

  if (match?.pathname == route) {
    console.log("misma ruta " + match?.pathname + " " + route);
  } else {
    console.log("dirigiendo... " + match?.pathname + " " + route);
  }
}

export { notification, navigation, getFilePath, nameIsValid, checkNewRoute };
