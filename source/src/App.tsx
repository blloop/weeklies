import React, { Component } from "react";
import "./App.css";
import Events from "./Events";

// npm install --save typescript @types/node @types/react @types/react-dom @types/jest
// npx tsc --init

interface AppState {}

class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div>
        <Events></Events>
      </div>
    );
  }
}

export default App;
