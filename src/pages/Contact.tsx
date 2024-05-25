import { twMerge } from "tailwind-merge";
import MainContainer from "../components/MainContainer";
import { notification, themes } from "../utils/helpers";
import type { Component } from "../utils/types";
import { Copy as CopyIcon } from "lucide-react";

function Contact(): Component {
  const { isSunnyDay } = themes();
  const copyMail = (): void => {
    navigator.clipboard.writeText("gioliotta.io@gmail.com");
    notification("success", "Mail copiado");
  };

  return (
    <MainContainer>
      <p
        className={twMerge(
          isSunnyDay ? "text-black/90" : "text-gray-200",
          "text-xl"
        )}
      >
        Contacta a este mail para consultas acerca de <i>lyra</i>
      </p>

      <div className="flex gap-x-4">
        <address
          className={twMerge(
            isSunnyDay ? "text-blue-800" : "text-blue-300",
            "text-xl underline"
          )}
        >
          gioliotta.io@gmail.com
        </address>
        <CopyIcon
          onClick={copyMail}
          size={30}
          color={isSunnyDay ? "#222222" : "#c0c0c0"}
          className="hover:scale-125 cursor-pointer duration-100"
        />
      </div>
    </MainContainer>
  );
}

export default Contact;
