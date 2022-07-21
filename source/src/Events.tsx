import React, { Component } from "react";
import { EventItem } from "./EventItem";

interface Props {
    eventList: EventItem[],
    removeItem(id:number): void,
    updateText(value: string, id: number): void,
}

interface State {}

class Events extends Component<Props, State> {

  changeText = (event: { target: { dataset: any; value: any; }; }) => {
    this.props.updateText(event.target.value, event.target.dataset.id);
  };

  render() {

    let output:any[] = [];
    for (let i = 0; i < this.props.eventList.length; i++) {
      output.push(
        <div className='event' key={i}>
          <p>Name: <b>{this.props.eventList[i].name}</b></p>
          {/* <p>ID: {this.props.eventList[i].id}</p> */}
          {/* <p>Description: {this.props.eventList[i].desc}</p> */}
          <input
            // @ts-ignore
            data-id={this.props.eventList[i].id}
            onChange={this.changeText}
            value={this.props.eventList[i].desc}
          />
          <button onClick={() => this.props.removeItem(this.props.eventList[i].id)}>Delete This Event</button>
        </div>
      );
    }
    return (
      <div>        
        {output}
      </div>
    );
  }
}

export default Events;
