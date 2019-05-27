import React from "react";

import { formatTime } from "../../lib/helpers.js";

import TimerButton from "./timer-button";
import "./index.css";

const DEFAULT_BACKGROUND = "lightcoral";
const REST_BACKGROUND = "lightgreen";

const TimerDashboard = ({ resting, buttons, seconds, task }) => {
  const backgroundColor = resting ? REST_BACKGROUND : DEFAULT_BACKGROUND;

  const dashButtons = buttons.map(({ value, onClick, enabled }) => {
    return (
      <span className="Button" key={value}>
        <TimerButton
          value={value}
          onClick={onClick}
          enabled={enabled}
          backgroundColor={backgroundColor}
        >
          {value}
        </TimerButton>
      </span>
    );
  });

  return (
    <div className="TimerDashboard" style={{ backgroundColor }}>
      <div className="Time">{formatTime(seconds)}</div>
      <div className="TimerTask">{task}</div>
      <div className="TimerButtons">{dashButtons}</div>
    </div>
  );
};

export default TimerDashboard;
