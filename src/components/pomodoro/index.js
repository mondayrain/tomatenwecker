import React from "react";

import { formatTime } from "../../lib/helpers";

import {
  returnDefaultState,
  returnStartIntervalState,
  returnClearIntervalState,
  returnCompleteState,
  returnSkipState,
  returnResetTimerState
} from "./index.helpers";

import {
  DOCUMENT_TITLE,
  TIMER_NO_TASK_COPY,
  TIMER_RESTING_COPY
} from "../../lib/copy";

import TimerDashboard from "../timer-dashboard";
import TodoDashboard from "../todo-dashboard";

import "./index.css";

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    this.state = returnDefaultState();
  }

  componentDidMount() {
    document.title = DOCUMENT_TITLE;
  }

  //-- HANDLERS --
  //--------------
  onStartCountdown = () => {
    this.setState({
      ...returnStartIntervalState(this.state, this.tickTimer)
    });
  };

  onPauseCountdown = () => {
    this.setState({
      ...returnClearIntervalState(this.state)
    });
  };

  onResetCountdown = () => {
    document.title = DOCUMENT_TITLE;

    this.setState({
      ...returnClearIntervalState(this.state),
      ...returnResetTimerState(this.state)
    });
  };

  onSkipCountdown = () => {
    const clearIntervalState =
      this.state.resting || this.state.todos.length === 1
        ? returnClearIntervalState(this.state)
        : {};

    const resetTimerState =
      this.state.todos.length === 1 ? returnResetTimerState(this.state) : {};

    this.setState({
      ...clearIntervalState,
      ...resetTimerState,
      ...returnSkipState(this.state)
    });
  };

  onTaskAdded = list => taskName => {
    if (taskName.length === 0) {
      return;
    }

    this.setState({
      [list]: this.state[list].concat(taskName)
    });
  };

  onTaskDeleted = list => taskName => {
    const taskIndex = this.state[list].indexOf(taskName);

    if (taskIndex === -1) {
      return;
    }

    this.setState({
      [list]: [
        ...this.state[list].slice(0, taskIndex),
        ...this.state[list].slice(taskIndex + 1)
      ]
    });
  };

  //-- LIFECYCLE HELPERS --
  //-----------------------
  tickTimer = () => {
    const stopTimer = this.state.currentTime === 1;

    if (stopTimer) {
      const clearIntervalState = this.state.resting
        ? {}
        : returnClearIntervalState(this.state);

      this.setState({
        ...clearIntervalState,
        ...returnCompleteState(this.state)
      });
    }

    const newTime = this.state.currentTime - 1;
    document.title = `(${formatTime(newTime)}) ${DOCUMENT_TITLE}`;
    this.setState({
      currentTime: newTime
    });
  };

  render() {
    const BUTTON_MAP = {
      START: {
        value: "Start",
        onClick: this.onStartCountdown,
        enabled:
          !this.state.intervalId &&
          (this.state.resting || this.state.todos.length > 0)
      },
      PAUSE: {
        value: "Pause",
        onClick: this.onPauseCountdown,
        enabled: this.state.intervalId
      },
      NEXT: {
        value: this.state.resting ? "Skip" : "Next",
        onClick: this.onSkipCountdown,
        enabled: this.state.resting || this.state.todos.length > 0
      },
      RESET: {
        value: "Reset",
        onClick: this.onResetCountdown,
        enabled: this.state.time !== this.state.currentTime
      }
    };

    const first_button = this.state.intervalId
      ? BUTTON_MAP.PAUSE
      : BUTTON_MAP.START;

    const buttons = [first_button].concat([BUTTON_MAP.NEXT, BUTTON_MAP.RESET]);

    const currentTask = this.state.resting
      ? TIMER_RESTING_COPY
      : this.state.todos[0];

    return (
      <div className="Pomodoro">
        <TimerDashboard
          task={currentTask || TIMER_NO_TASK_COPY}
          resting={this.state.resting}
          seconds={currentTask ? this.state.currentTime : 0}
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
