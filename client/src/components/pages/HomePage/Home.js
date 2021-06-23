import React from "react";
import Hero from "../../Hero";
import { homeObjOne } from "./Data";
import Signup from "../../Signup/FormSignup";

function Home() {
  return (
    <>
      <Hero {...homeObjOne}   />
     <Signup />
    </>
  );
}

export default Home;
