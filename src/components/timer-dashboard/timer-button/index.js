import React from "react";
import "./index.css";

const DEFAULT_COLOUR = "snow";
const DEFAULT_BACKGROUND_COLOUR = "lightcoral";

const TimerButton = ({
  value,
  onClick,
  enabled,
  color = DEFAULT_COLOUR,
  backgroundColor = DEFAULT_BACKGROUND_COLOUR
}) => {
  // TODO: Light up on hover
  // TODO: Change of mouse on hover, it's a button!
  return (
    <button
      className="TimerButton"
      style={{
        color,
        backgroundColor,
        borderColor: color
      }}
      onClick={onClick}
      enabled={enabled}
    >
      {value}
    </button>
  );
};

export default TimerButton;
