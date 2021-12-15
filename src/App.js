import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    //Initialize beginning values as empty
    this.state = {
      startDate: null,
      endDate: null,
    };
  }

  render() {
    return (
      <div className="App">
        <h1 className="Align"> Fanimal Calender App </h1>
        <DateRangePicker
          startDate={this.state.startDate}
          startDateId="startId"
          endDate={this.state.endDate}
          endDateId="endId"
          onDatesChange={({ startDate, endDate }) =>
            this.setState({ startDate, endDate })
          }
          focusedInput={this.state.focusedInput}
          onFocusChange={(focusedInput) => this.setState({ focusedInput })}
        />
      </div>
    );
  }
}

export default App;
