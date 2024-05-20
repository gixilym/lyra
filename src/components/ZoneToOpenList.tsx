import { navigation } from "../utils/helpers";
import type { Component } from "../utils/types";

function ZoneToOpenList(): Component {
  const { goTo } = navigation();
  return (
    <div
      onMouseEnter={() => goTo("/list")}
      className="absolute bottom-0 left-0 bg-transparent w-32 h-36 text-transparent"
    >
      .
    </div>
  );
}

export default ZoneToOpenList;
