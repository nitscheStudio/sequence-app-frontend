import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Get Started With Sequence</h1>
      <Link to="/register" className="">
        Register
      </Link>
      <Link to="/login" className="">
        Login
      </Link>
    </>
  );
};

export default Home;
