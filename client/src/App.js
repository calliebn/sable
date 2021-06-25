import React, { Component } from "react";
import Yarn from "./pages/Yarn";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter,Route,Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Switch>
          <Route path="/yarn" component={Yarn}/>
        </Switch>
      </div>
      </BrowserRouter>
    )
  }
}


export default App;
