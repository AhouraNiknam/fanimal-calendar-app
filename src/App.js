import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import "./App.css";

const defaultProps = {
  numberOfMonths: 2,
  //This keeps the calendar open after date selection
  keepOpenOnDateSelect: true,
  reopenPickerOnClearDates: true,
  minimumNights: 1,
  enableOutsideDays: true,
  //This enables user to select past dates
  isOutsideRange() {},
  autoFocus: false,
  autoFocusEndDate: false,
};

class App extends Component {
  constructor(props) {
    super(props);

    let focusedInput = null;
    if (props.autoFocus) {
      focusedInput = this.startDate;
    } else if (props.autoFocusEndDate) {
      focusedInput = this.endDate;
    }
    this.state = {
      focusedInput,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate,
    };
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    const { stateDateWrapper } = this.def;
    this.setState({
      startDate: startDate && stateDateWrapper(startDate),
      endDate: endDate && stateDateWrapper(endDate),
    });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const { isOutsideRange } = this.props;
    const { focusedInput } = this.state;

    return (
      <div className="App">
        <h1 className="Align"> Fanimal Calender App </h1>
        <DateRangePicker
          isOutsideRange={isOutsideRange}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          //Don't know why this is causing an error, program still works though
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

DateRangePicker.defaultProps = defaultProps;

export default App;
