import React, { Component } from "react";

interface Props {
    eventList: string[],
    removeItem(id:number): () => void;
}

interface State {}

class Events extends Component<Props, State> {
  render() {

    let output:any[] = [];
    for (let i = 0; i < this.props.eventList.length; i++) {
      output.push(
        <div className='event' key={i}> List Item: {this.props.eventList[i]} 
          <input defaultValue={"Description"}></input>
          <button onClick={this.props.removeItem(i)}></button>
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
