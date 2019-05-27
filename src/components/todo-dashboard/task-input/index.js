import React from "react";
import "./index.css";

const ADD_TASK_COPY = "Add a task";

class TaskInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.value);

    this.setState({
      value: ""
    });
  };

  render() {
    return (
      <form>
        <div className="TaskInput">
          <input
            className="Input"
            type="text"
            name={ADD_TASK_COPY}
            value={this.state.value}
            onChange={this.handleChange}
          />

          <br />
          <input
            className="AddButton"
            type="submit"
            value="Add Task"
            onClick={this.handleSubmit}
          />
        </div>
      </form>
    );
  }
}

export default TaskInput;
