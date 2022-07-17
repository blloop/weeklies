import React, { Component } from "react";
import "./App.css";
import Events from "./Events";

interface AppState {
  eventList: string[];
}

class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    let check: any = localStorage.getItem("events");
    let input: string[] = [];
    if (check !== null) {
      input = JSON.parse(check);
      console.log("Listing events read: " + input);
    }
    this.state = {
      eventList: input
    }
  }

  listEvents = () => {
    console.log("List of Events: " + JSON.stringify(this.state.eventList));
  }

  addEvent = () => {
    let newEvents = this.state.eventList;
    newEvents.push("Event " + newEvents.length);
    
    localStorage.setItem("events", JSON.stringify(this.state.eventList));
    this.listEvents();

    let newState = {
      eventList: newEvents
    }
    this.setState(newState);
  }

  removeEvent = (id:number) => {
    let newEvents = this.state.eventList;
    newEvents.pop();

    this.listEvents();

    let newState = {
      eventList: newEvents
    }
    this.setState(newState);
  }


  render() {

    return (
      <div>
        <button onClick={this.addEvent}> Add An Event </button>
        <Events removeItem={this.removeEvent(id)} eventList={this.state.eventList}></Events>
      </div>
    );
  }
}

export default App;
