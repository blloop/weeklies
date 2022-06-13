import React, { Component } from "react";

interface Props {
    eventList: string[];
}

interface State {}

class Events extends Component<Props, State> {
  render() {

    let output:any[] = [];
    for (let i = 0; i < this.props.eventList.length; i++) {
      output.push(<div className='event'> List Item: {this.props.eventList[i]} 
        <input defaultValue={"Description"}></input>
      </div>);
    }
    return (
      <div>        
        {output}
      </div>
    );
  }
}

export default Events;
