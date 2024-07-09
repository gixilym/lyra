import { Feather as Icon } from "lucide-react";
import type { Component } from "../utils/types";
import usePreferences from "../hooks/usePreferences";

function FeatherIcon(): Component {
  const { myAnimations } = usePreferences();

  if (myAnimations()) {
    return (
      <div id="feather" className="pb-6">
        <Icon size={70} color="rgb(99,102,241)" />
      </div>
    );
  } else return <Icon size={70} color="rgb(99,102,241)" />;
}

export default FeatherIcon;
