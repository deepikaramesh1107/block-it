import React, { Component } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.calendarRef = React.createRef();

    this.state = {
      timeRangeSelectedHandling: "Enabled",
    };
  }

  calendar() {
    return this.calendarRef.current.control;
  }

  componentDidMount() {
    // load event data
    this.setState({
      viewType: "Week",
      startDay: "Monday",
      startTime: "0700",
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
            const form = [
              { name: "Event", id: "event" },
              { name: "Description", id: "desc" },
            ];
            DayPilot.Modal.form(form).then((modal) => {
              console.log(modal.result);
              if (!modal.result) {
                return;
              }
              const eventsOne = [...this.state.events];
              eventsOne.push({
                id: DayPilot.guid(),
                text: `${modal.result["event"]}\n${modal.result["desc"]}`,
                start: args.start,
                end: args.end,
              });
              this.setState({ ...this.state, events: eventsOne });
            });
          }}
          viewType="Week"
        />
        <button
          onClick={() => {
            const eventsOne = [...this.state.events];
            eventsOne.push(
              {
                id: 1,
                text: "lunch!",
                start: "2022-10-26T11:30:00",
                end: "2022-10-26T12:30:00",
              },
              {
                id: 2,
                text: "study!",
                start: "2022-10-27T14:00:00",
                end: "2022-10-27T16:00:00",
              },
              {
                id: 3,
                text: "study!",
                start: "2022-10-25T10:00:00",
                end: "2022-10-25T11:00:00",
              }
            );
            this.setState({ ...this.state, events: eventsOne });
            console.log("events");
          }}
        >
          block-it!
        </button>
      </>
    );
  }
}

export default Calendar;
