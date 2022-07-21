import React, { Component } from "react";
import "./App.css";
import { EventItem } from "./EventItem";
import Events from "./Events";

interface AppState {
  eventList: EventItem[];
  counter: number
}

class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    let check: any = localStorage.getItem("weeklies");
    let input: EventItem[] = [];
    if (check !== null) {
      input = JSON.parse(check);
      console.log("Listing events read: " + input);
    }
    this.state = {
      eventList: input,
      counter: 0
    }
  }

  saveEvents = () => {
    localStorage.setItem("weeklies", JSON.stringify(this.state.eventList));
    console.log("List of Events: " + JSON.stringify(this.state.eventList));
  }

  addEvent = () => {
    let newEvents = this.state.eventList;
    let newItem: EventItem = {
      name: "Event " + this.state.counter,
      desc: "Description",
      id: this.state.counter
    }
    newEvents.push(newItem); 

    let newState = {
      eventList: newEvents,
      counter: this.state.counter + 1
    }
    this.setState(newState);
    this.saveEvents();
  }

  removeEvent = (id: number) => {
    let newEvents = this.state.eventList;

    for (let i = 0; i < newEvents.length; i++) {
      if (newEvents[i].id === id) {
        newEvents.splice(i, 1);
        break;
      }
    }
    
    let newState = {
      eventList: newEvents,
      counter: this.state.counter
    }
    this.setState(newState);
    this.saveEvents();
  }

  updateEvents = (value: string, id: number) => {
    let newEvents = this.state.eventList;
    let input: number = Number(id);

    for (let i = 0; i < newEvents.length; i++) {
      if (newEvents[i].id === input) {
        newEvents[i].desc = value;
        break;
      }
    }

    let newState = {
      eventList: newEvents,
      counter: this.state.counter
    }
    this.setState(newState);
    this.saveEvents();
  }

  render() {

    return (
      <div>
        {/* <button onClick={window.location.reload}>Reload Page </button> */}
        <button onClick={this.addEvent}> Add An Event </button>
        <Events 
          eventList={this.state.eventList}
          removeItem={this.removeEvent} 
          updateText={(value, id) => {this.updateEvents(value, id);}}
        />
      </div>
    );
  }
}

export default App;
