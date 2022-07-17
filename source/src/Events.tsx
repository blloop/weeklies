import React, { Component } from "react";
import { EventItem } from "./EventItem";

interface Props {
    eventList: EventItem[],
    removeItem(id:number): void
}

interface State {}

class Events extends Component<Props, State> {
  render() {

    let output:any[] = [];
    for (let i = 0; i < this.props.eventList.length; i++) {
      output.push(
        <div className='event' key={i}> 
          Item Name: {this.props.eventList[i].name} <br></br>
          Item Desc: {this.props.eventList[i].desc}    <br></br>     
          Item ID: {this.props.eventList[i].id} <br></br>
          <input defaultValue={"Description"}></input> <br></br>
          <button onClick={() => this.props.removeItem(i)}></button>
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
