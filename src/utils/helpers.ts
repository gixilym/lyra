import toast from "react-hot-toast";
import { type NavigateFunction, useNavigate } from "react-router-dom";

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

function nameIsValid(name: string): boolean {
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

export { notification, navigation, nameIsValid };
