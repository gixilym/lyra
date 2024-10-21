import { Feather as Icon } from "lucide-react";
import type { Component } from "../utils/types";

function FeatherIcon(): Component {
  return (
    <div id="feather" className="pb-6">
      <Icon size={70} color="rgb(99,102,241)" />
    </div>
  );
}

export default FeatherIcon;
