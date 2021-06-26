import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";





import Home from "./pages/HomePage/Home";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Yarn from "./pages/Yarn";




const App =() => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user =AuthService.getCurrentUser();

    if(user) {
      setCurrentUser(user);
    }
  }, []);

  const logout = () => {
    AuthService.logout()
  }
  return (




    <Router>
    
     
      <Navbar />
  
      <Switch>
    
        <Route path="/" exact component={Home} />
 
        <Route path="/yarn" export component ={Yarn} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      
      </Switch>
      <Footer />
    
    
    </Router>
  );
}

export default App;
