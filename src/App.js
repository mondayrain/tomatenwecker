import React from "react";
import "./App.css";

import Pomodoro from "./components/pomodoro";

function App() {
  return (
    <div className="App">
      <Title>tomatenwecker</Title>
      <Pomodoro />
      <Footer />
    </div>
  );
}

const Title = props => <h1 className="Title">{props.children}</h1>;

const FooterLink = props => (
  <a
    className="FooterLink"
    href="https://larissafeng.me"
    target="_blank"
    rel="noopener noreferrer"
  >
    {props.children}
  </a>
);

const Footer = () => {
  return (
    <div className="Footer">
      made with <b>&lt;3</b> by <FooterLink>larissa feng</FooterLink>
    </div>
  );
};

export default App;
