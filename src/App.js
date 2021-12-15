import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import "./App.css";
import moment from "moment";
import isInclusivelyAfterDay from "react-dates/lib/utils/isInclusivelyAfterDay";
import omit from "lodash/omit";

const defaultProps = {
  initialVisibleMonth: null,
  numberOfMonths: 2,
  //This keeps the calendar open after date selection
  keepOpenOnDateSelect: true,
  reopenPickerOnClearDates: true,
  minimumNights: 1,
  enableOutsideDays: true,
  isDayBlocked: () => false,
  isOutsideRange: (day) => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat("L"),
  monthFormat: "MMMM YYYY",
  stateDateWrapper: (date) => date,
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
    const { stateDateWrapper } = this.props;
    this.setState({
      startDate: startDate && stateDateWrapper(startDate),
      endDate: endDate && stateDateWrapper(endDate),
    });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    const props = omit(this.props, [
      "autoFocus",
      "autoFocusEndDate",
      "initialStartDate",
      "initialEndDate",
      "stateDateWrapper",
    ]);

    return (
      <div className="App">
        <h1 className="Align"> Fanimal Calender App </h1>
        <DateRangePicker
          {...props}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={this.state.startDate}
          startDateId="your_unique_start_date_id"
          endDate={this.state.endDate}
          endDateId="your_unique_end_date_id"
          //Don't know why this is causing an error
          //If I change the name, the program crashes
          onDatesChange={({ startDate, endDate }) =>
            this.setState({ startDate, endDate })
          }
          focusedInput={this.state.focusedInput}
          onFocusChange={(focusedInput) => this.setState({ focusedInput })}
        />
      </div>
      //#region Previous Code
      //Calendar closes after date selection
      /*
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
      */
      //#endregion
    );
  }
}

DateRangePicker.defaultProps = defaultProps;

export default App;
