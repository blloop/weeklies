import React, { Component } from "react";
import "./App.css";
import Events from "./Events";

interface AppState {
  eventList: string[];
}

class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      eventList: []
    };
  }

  addEvent = () => {
    let newEvents = this.state.eventList;
    newEvents.push("Event " + newEvents.length);
    let newState = {
      eventList: newEvents
    };
    this.setState(newState);
  }


  render() {

    return (
      <div>
        <button onClick={this.addEvent}> Add an event </button>
        <Events eventList={this.state.eventList}></Events>
      </div>
    );
  }
}

export default App;
