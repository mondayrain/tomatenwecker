import React from "react";

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

function formatTime(seconds) {
  const displaySeconds = seconds % 60;
  const displayMinutes = (seconds - displaySeconds) / 60;

  return `${padNumber(displayMinutes)}:${padNumber(displaySeconds)}`;
}

function padNumber(number) {
  const stringNumber = String(number);
  return stringNumber.length > 1 ? stringNumber : `0${stringNumber}`;
}

export default TimerDashboard;
