import { Copy as CopyIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import MainContainer from "../components/MainContainer";
import translations from "../utils/dictionary";
import { notification, themes } from "../utils/helpers";
import type { Component } from "../utils/types";

function Support(): Component {
  const { isSunnyDay } = themes();
  const d = translations();
  const copyMail = (): void => {
    navigator.clipboard.writeText("gioliotta.io@gmail.com");
    notification("success", d.EmailCopied);
  };

  return (
    <MainContainer>
      <p
        className={twMerge(
          isSunnyDay ? "text-black/90" : "text-gray-200",
          "sm:text-xl text-md"
        )}
      >
        {d.ContactThisEmailForQuestions}
      </p>

      <div className="flex gap-x-4">
        <address
          className={twMerge(
            isSunnyDay ? "text-blue-800" : "text-blue-300",
            "sm:text-xl text-lg underline"
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

export default Support;
