import MainContainer from "../components/MainContainer";
import { notification } from "../utils/helpers";
import type { Component } from "../utils/types";
import { Copy as CopyIcon } from "lucide-react";

function Contact(): Component {
  const copyMail = (): void => {
    navigator.clipboard.writeText("gioliotta.io@gmail.com");
    notification("success", "Mail copiado");
  };

  return (
    <MainContainer>
      <p className="text-gray-200 text-xl">
        Contacta a este mail para consultas acerca de <i>lyra</i>
      </p>

      <div className="flex gap-x-4">
        <address className="text-blue-300 text-xl underline">
          gioliotta.io@gmail.com
        </address>
        <CopyIcon
          onClick={copyMail}
          size={30}
          color="#c0c0c0"
          className="hover:scale-125 cursor-pointer duration-100"
        />
      </div>
    </MainContainer>
  );
}

export default Contact;
