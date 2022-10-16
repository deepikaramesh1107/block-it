import React, { Component } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.calendarRef = React.createRef();

    this.state = {
      timeRangeSelectedHandling: "Enabled",
      onEventClick: async (args) => {
        const modal = await DayPilot.Modal.prompt(
          "Update event text:",
          args.e.text()
        );
        if (!modal.result) {
          return;
        }
        const e = args.e;
        e.data.text = modal.result;
        this.calendar.events.update(e);
      },
    };
  }

  calendar() {
    return this.calendarRef.current.control;
  }

  componentDidMount() {
    // load event data
    this.setState({
      viewType: "Week",
      startDate: "2022-10-13",
      events: [],
    });
  }

  render() {
    return (
      <>
        <h1>Daily Calendar</h1>

        <DayPilotCalendar
          {...this.state}
          ref={this.calendarRef}
          onTimeRangeSelected={(args) => {
            DayPilot.Modal.prompt("New event name", "Event").then((modal) => {
              //this.scheduler.clearSelection();
              if (!modal.result) {
                console.log("hello");
                return;
              }
              const eventsOne = [...this.state.events];
              eventsOne.push({
                id: DayPilot.guid(),
                text: modal.result,
                start: args.start,
                end: args.end,
              });
              this.setState({ ...this.state, events: eventsOne });
            });
          }}
          viewType="Week"
        />
      </>
    );
  }
}

export default Calendar;
