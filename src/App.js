import React from "react";
import "./App.css";

import DashButton from "./components/dash-button";

function App() {
  return (
    <div className="App">
      <DashButton value="Start" />
      <DashButton value="Stop" />
    </div>
  );
}

export default App;
