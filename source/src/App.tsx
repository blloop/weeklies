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
      name: "Event" + this.state.counter,
      desc: "Description",
      id: this.state.counter
    }
    newEvents.push(newItem);    
    this.saveEvents();

    let newState = {
      eventList: newEvents,
      counter: this.state.counter + 1
    }
    this.setState(newState);
  }

  removeEvent = (id:number) => {
    let newEvents = this.state.eventList;
    for (let i = 0; i < this.state.eventList.length; i++) {
      if (this.state.eventList[i].id === id) {
        newEvents.splice(i, 1);
      }
    }
    
    this.saveEvents();

    let newState = {
      eventList: newEvents,
      counter: this.state.counter
    }
    this.setState(newState);
  }


  render() {

    return (
      <div>
        <button onClick={this.addEvent}> Add An Event </button>
        <Events removeItem={this.removeEvent} eventList={this.state.eventList}></Events>
      </div>
    );
  }
}

export default App;
