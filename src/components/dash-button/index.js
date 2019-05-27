import React from "react";
import "./index.css";

const DEFAULT_COLOUR = "snow";
const DEFAULT_BACKGROUND_COLOUR = "lightcoral";

const DashButton = ({
  value,
  onClick,
  color = DEFAULT_COLOUR,
  backgroundColor = DEFAULT_BACKGROUND_COLOUR
}) => {
  return (
    <button
      className="DashButton"
      style={{
        color,
        backgroundColor,
        borderColor: color
      }}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default DashButton;
