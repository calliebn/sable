import React from "react";
import ReactDOM from "react-dom";
<<<<<<< HEAD
import { BrowserRouter } from "react-router-dom";
=======
>>>>>>> fc85ebd716f0fb9f10656cdec1f09adc6dbb53ad
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

<<<<<<< HEAD
ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );

=======
ReactDOM.render(<App />, document.getElementById("root"));
>>>>>>> fc85ebd716f0fb9f10656cdec1f09adc6dbb53ad
registerServiceWorker();
