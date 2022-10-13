
import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";

class Calendar extends Component {

    constructor(props) {
        super(props);

        this.calendarRef = React.createRef();

        this.state = {
            timeRangeSelectedHandling: "Enabled",
            onEventClick: async args => {
                const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
                if (!modal.result) { return; }
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

        DailyPilot.Schedular.api
        // load event data
        this.setState({
            viewType: 'Week',
            startDate: "2022-10-13",
            events: [
                {
                    id: 1,
                    text: "Event 1",
                    start: "2022-10-13T10:30:00",
                    end: "2022-10-13T13:00:00"
                },
                {
                    id: 2,
                    text: "Event 2",
                    start: "2022-10-11T09:30:00",
                    end: "2022-10-11T11:30:00",
                    barColor: "#6aa84f"
                },
            ]
        });

    }
    

    render() {
        return (
            <>
            <h1>Daily Calendar</h1>
            <
            DayPilotCalendar
            {...this.state}
            ref={this.calendarRef}
            viewType = "Week"

            
        />
            </>
            
            
            
            
        );
    }
    /*dp.onTimeRangeSelected = function (args) {
        var name = prompt("New event name:", "Event");
        dp.clearSelection();
        if (!name) return;
        var e = new DayPilot.Event({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            resource: args.resource,
            text: name
        });
        dp.events.add(e);
        dp.message("Created");
    };*/
}

export default Calendar;