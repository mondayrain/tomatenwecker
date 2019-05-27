import React from "react";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
}

function formatTime(date) {
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${padNumber(minutes)}:${padNumber(seconds)}`;
}

function padNumber(number) {
  const stringNumber = String(number);
  return stringNumber.length > 1 ? stringNumber : `0${stringNumber}`;
}
