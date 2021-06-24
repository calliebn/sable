import React from "react";
import Hero from "../../Hero";
import { homeObjOne } from "./Data";
import Signup from "../../Signup/FormSignup";
import Login from "../../Login/Login";




function Home() {
  return (
    <>
      <Hero {...homeObjOne} />
      <Signup />
   <Login />
    </>
  );
}

export default Home;
