import React from "react";
import { Link } from "react-router-dom";

const RootError = () => {
  return (
    <>
      <h1>Whoops you got an error...</h1>
      <Link to="/">Go to Home</Link>
    </>
  );
};

export default RootError;
