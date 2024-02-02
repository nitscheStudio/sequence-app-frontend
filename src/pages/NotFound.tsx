import React from "react";
import sequenceLogo from "../assets/sequence-logo_new.svg";

const NotFound = () => {
  return (
    <>
      <img
        className="sequence-logo-form"
        src={sequenceLogo}
        alt="sequence logo"
      />
      <h1>Oops!, something went wrong</h1>
      <p className="error-404-paragraph">
        There could be a misconfiguration in the system or a service outage. We
        track these errors automatically, but if the problem persists feel free
        to contact us. Please try again.
      </p>
    </>
  );
};

export default NotFound;
