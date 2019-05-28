import React from "react";
import "./App.css";

import Pomodoro from "./components/pomodoro";

function App() {
  return (
    <div className="App">
      <h1 className="Title">tomatenwecker</h1>
      <Pomodoro />
      <div className="Footer">
        made with <b>&lt;3</b> by{" "}
        <a
          className="FooterLink"
          href="https://larissafeng.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          larissa feng
        </a>
      </div>
    </div>
  );
}

export default App;
