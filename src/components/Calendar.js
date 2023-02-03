import React, { Component } from 'react';
import NavBar from './NavBar';
import EventList from './EventList';

// Compare two events by hour, then minute
let eventCompare = (ev1, ev2) => {
    return (
        ev1.hour - ev2.hour === 0 ?
            ev1.min - ev2.min :
            ev1.hour - ev2.hour
    );
}

let colorNames = [
    'red',
    'yellow',
    'green',
    'blue'
];

let lightColors = [
    'rgb(255, 158, 158)',
    'rgb(241, 218, 100)',
    'rgb(157 241 140)',
    'rgb(167 188 255)'
];

let darkColors = [
    'rgb(255, 89, 89)',
    'rgb(223, 194, 50)',
    'rgb(97, 218, 73)',
    'rgb(103, 139, 255)'
];

class Calendar extends Component {

    constructor(props) {
        let jsonInfo = localStorage.getItem('weeklies');
        super(props);
        this.state = {
            events: (jsonInfo ?
                JSON.parse(jsonInfo)['events'] :
                []
            ),
            useMilitary: (jsonInfo ?
                JSON.parse(jsonInfo)['useMilitary'] :
                false
            ),
            accentColor: (jsonInfo ?
                JSON.parse(jsonInfo)['accentColor'] :
                'red'
            )
        };
    }

    componentDidMount() {
        let checkColor = this.state.accentColor;
        this.changeColor(
            (checkColor === 'red' ?
                0 :
                checkColor === 'yellow' ?
                    1 :
                    checkColor === 'green' ?
                        2 :
                        checkColor === 'blue' ?
                            3 : 3
            )
        );
    }

    // Add an event to calendar
    addEvent = (item) => {
        if (item.title === '') {
            alert('Event title cannot be empty!');
            return;
        }
        if (this.state.events.some(
            curr =>
                curr.day === item.day &&
                ((curr.hour + (curr.min ? 0 : 0.5) <
                    item.hour2 + (item.min2 ? 0 : 0.5) &&
                    curr.hour2 + (curr.min2 ? 0 : 0.5) >
                    item.hour + (item.min ? 0 : 0.5)) ||
                    (curr.hour2 + (curr.min2 ? 0 : 0.5) >
                        item.hour + (item.min ? 0 : 0.5) &&
                        curr.hour + (curr.min ? 0 : 0.5) <
                        item.hour + (item.min ? 0 : 0.5))
                )
        )) {
            alert("Event overlaps with a current event!");
            return;
        }
        if (item.hour2 < item.hour ||
            (item.hour === item.hour2 && item.min >= item.min2)) {
            alert("Event must occur for at least 30 min!");
            return;
        }
        let newList = this.state.events
        newList.push(item);
        newList.sort(eventCompare);
        let newState = {
            ...this.state,
            Events: newList
        }
        this.setState(newState);
        localStorage.setItem(
            'weeklies',
            JSON.stringify(newState)
        );
    }

    editEvent = () => {
        // let country = data.find(el => el.code === "AL");
        return;
    }

    // Remove all events from calendar
    clearEvents = () => {
        let newState = {
            ...this.state,
            events: []
        }
        this.setState(newState);
        localStorage.setItem(
            'weeklies',
            JSON.stringify(newState)
        );
    }

    // Toggle 24 hour time setting
    toggleMilitary = () => {
        let newState = {
            ...this.state,
            useMilitary: !this.state.useMilitary
        }
        this.setState(newState);
        localStorage.setItem(
            'weeklies',
            JSON.stringify(newState)
        );
    }

    // Change accent color
    changeColor = (num) => {
        document.body.style.setProperty(
            '--light-accent', lightColors[num]
        );
        document.body.style.setProperty(
            '--dark-accent', darkColors[num]
        );
        let newState = {
            ...this.state,
            accentColor: colorNames[num]
        }
        this.setState(newState);
        localStorage.setItem(
            'weeklies',
            JSON.stringify(newState)
        );

    }

    render() {
        return (
            <div className='calendar'>
                <NavBar
                    eventAdd={this.addEvent}
                    eventClear={this.clearEvents}
                    useMilitary={this.state.useMilitary}
                    toggleMilitary={this.toggleMilitary}
                    accentColor={this.state.accentColor}
                    changeColor={this.changeColor}>
                </NavBar>
                <EventList
                    allEvents={this.state.events}
                    useMilitary={this.state.useMilitary}>
                </EventList>
            </div>
        )
    }
}

export default Calendar;