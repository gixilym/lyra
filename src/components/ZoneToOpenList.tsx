import { useState } from "react";
import usePreferences from "../hooks/usePreferences";
import useStorage from "../hooks/useStorage";
import { PAGES } from "../utils/consts";
import translations from "../utils/dictionary";
import { navigation, pathIs } from "../utils/helpers";
import type { Component } from "../utils/types";

function ZoneToOpenList(): Component {
  const d = translations(),
    { goTo } = navigation(),
    { setItem } = useStorage(),
    { myMsgDisplayed } = usePreferences(),
    [showMessage, setShowMessage] = useState<boolean>(true);

  if (myMsgDisplayed()) {
    return (
      <div
        onMouseEnter={() => goTo(PAGES.list)}
        className="fixed bottom-0 left-0 w-16 h-48 text-transparent bg-transparent"
      >
        .
      </div>
    );
  } else if (pathIs(PAGES.file) && showMessage) {
    return (
      <div className="fixed bottom-0 left-0 bg-indigo-100 w-28 h-48 text-black rounded-tr-lg pt-1 px-1.5 flex flex-col justify-start items-center gap-y-3 border-2">
        <p className="text-center text-black/70 font-semibold text-md">
          {d.GoToTheListByPlacingTheCursorHere}
        </p>
        <button
          onClick={() => {
            setShowMessage(false);
            setItem("list-msg", "true");
          }}
          className="bg-green-400 text-black/70 border-2 border-green-600 rounded-lg px-5 py-1 font-semibold text-lg duration-75"
        >
          OK
        </button>
      </div>
    );
  }
}

export default ZoneToOpenList;
