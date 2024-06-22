import { Feather as Icon } from "lucide-react";
import { myAnimations } from "../utils/helpers";
import type { Component } from "../utils/types";

function FeatherIcon(): Component {
  const animations = myAnimations();

  if (animations) {
    return (
      <div id="feather">
        <Icon size={70} color="rgb(99,102,241)" />
      </div>
    );
  } else return <Icon size={70} color="rgb(99,102,241)" />;
}

export default FeatherIcon;
