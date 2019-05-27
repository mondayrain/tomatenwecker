import React from "react";

import TimerDashboard from "../timer-dashboard";
import TodoDashboard from "../todo-dashboard";

import "./index.css";
import { formatTime } from "../../lib/helpers";

const DOCUMENT_TITLE = "tomatenwecker || pomodoro";

const TASK_SECONDS = 1500;
const REST_SECONDS = 300;
const LONG_REST_SECONDS = 600;

const RESTING_COPY = "Take a break!";
const NO_TASK_COPY = "No task to do";

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      completedTodos: [],
      resting: false,
      time: TASK_SECONDS,
      currentTime: TASK_SECONDS,
      intervalId: null
    };
  }

  componentDidMount() {
    document.title = DOCUMENT_TITLE;
  }

  //-- HANDLERS --
  //--------------
  onStartCountdown = () => {
    if (this.state.intervalId || this.state.todos.length === 0) {
      return;
    }

    const intervalId = setInterval(this.tickTimer, 1000);
    this.setState({
      intervalId
    });
  };

  onStopCountdown = () => {
    if (!this.state.intervalId) {
      return;
    }

    clearInterval(this.state.intervalId);
    this.setState({
      intervalId: null
    });
  };

  onResetCountdown = () => {
    document.title = DOCUMENT_TITLE;

    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }

    this.setState({
      currentTime: this.state.time,
      intervalId: null
    });
  };

  onSkipCountdown = () => {
    if (!this.state.resting && this.state.todos.length === 0) {
      return;
    }

    document.title = DOCUMENT_TITLE;

    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }

    this.setState({
      resting: false,
      intervalId: null,
      time: TASK_SECONDS,
      currentTime: TASK_SECONDS
    });

    this.completeTask();
  };

  onTaskAdded = taskName => {
    if (taskName.length === 0) {
      return;
    }

    this.setState({
      todos: this.state.todos.concat(taskName)
    });
  };

  onTaskDeleted = taskName => {
    const taskIndex = this.state.todos.indexOf(taskName);

    if (taskIndex === -1) {
      return;
    }

    this.setState({
      todos: [
        ...this.state.todos.slice(0, taskIndex),
        ...this.state.todos.slice(taskIndex + 1)
      ]
    });
  };

  //-- HELPERS --
  //--------------
  tickTimer = () => {
    const stopTimer = this.state.currentTime === 1;

    if (stopTimer) {
      this.onStopCountdown();
      this.completeTask();
      this.setNextTimer();
    }

    const newTime = this.state.currentTime - 1;
    document.title = `(${formatTime(newTime)}) ${DOCUMENT_TITLE}`;
    this.setState({
      currentTime: newTime
    });
  };

  completeTask = () => {
    if (!this.state.resting) {
      const finishedTask = this.state.todos[0];
      this.setState({
        todos: this.state.todos.slice(1),
        completedTodos: [finishedTask].concat(this.state.completedTodos)
      });
    }
  };

  setNextTimer = () => {
    // TODO: Get rid of this intermediary seconds
    let seconds;

    if (this.state.resting) {
      seconds = TASK_SECONDS;
    } else {
      seconds =
        this.state.completedTodos.length % 4 === 0
          ? LONG_REST_SECONDS
          : REST_SECONDS;
    }

    const resting = !this.state.resting;

    this.setState({
      time: seconds,
      currentTime: seconds,
      resting
    });

    if (resting) {
      const intervalId = setInterval(this.tickTimer, 1000);
      this.setState({
        intervalId
      });
    }
  };

  render() {
    const BUTTON_MAP = {
      START: {
        value: "Start",
        onClick: this.onStartCountdown,
        enabled: !this.state.intervalId
      },
      STOP: {
        value: "Stop",
        onClick: this.onStopCountdown,
        enabled: this.state.intervalId
      },
      SKIP: {
        value: "Skip",
        onClick: this.onSkipCountdown,
        enabled: this.state.todos.length > 0
      },
      RESET: {
        value: "Reset",
        onClick: this.onResetCountdown,
        enabled: true
      }
    };

    const first_button = this.state.intervalId
      ? BUTTON_MAP.STOP
      : BUTTON_MAP.START;
    const buttons = [first_button].concat([BUTTON_MAP.SKIP, BUTTON_MAP.RESET]);

    const currentTask = this.state.resting ? RESTING_COPY : this.state.todos[0];

    return (
      <div className="Pomodoro">
        <TimerDashboard
          task={currentTask || NO_TASK_COPY}
          resting={this.state.resting}
          seconds={this.state.currentTime}
          buttons={buttons}
        />

        <TodoDashboard
          todos={this.state.todos}
          completedTodos={this.state.completedTodos}
          onTaskAdded={this.onTaskAdded}
          onTaskDeleted={this.onTaskDeleted}
        />
      </div>
    );
  }
}

export default Pomodoro;
