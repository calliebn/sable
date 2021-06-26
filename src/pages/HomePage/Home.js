import React from "react";
import Hero from "../../components/Hero"
import Login from "../../components/Login";
import Register from "../../components/Register";
// import { homeObjOne } from "./Data";



function Home() {
  return (
    <>
      {/* <Hero {...homeObjOne}   /> */}
    <Login />
    <Register />
    </>
  );
}

export default Home;
