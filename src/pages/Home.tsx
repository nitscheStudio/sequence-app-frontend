import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import LinkButton from "../components/LinkButton";

const Home = () => {
  return (
    <>
      {/* <h1>Get Started With Sequence</h1>
      <Link to="/register" className="">
        Register
      </Link>
      <Link to="/login" className="">
        Login
      </Link> */}
      <div className="container">
        <div className="wrapper">
          <div className="grid">
            <div className="homepage-headline-container">
              <h1 className="homepage-headline">
                Get Started with <span>Sequence</span> and create amazing Tracks{" "}
                <span>instantly</span>
              </h1>
              <div className="icon-text-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="29.054"
                  height="16.02"
                  viewBox="0 0 29.054 16.02"
                >
                  <path
                    id="Icon_ionic-ios-arrow-round-forward"
                    data-name="Icon ionic-ios-arrow-round-forward"
                    d="M26.4,11.558a.962.962,0,0,0-.01,1.535l6.136,5.081H9.177a1.209,1.209,0,0,0-1.3,1.085,1.209,1.209,0,0,0,1.3,1.085H32.519l-6.136,5.081a.968.968,0,0,0,.01,1.535,1.507,1.507,0,0,0,1.847-.008l8.316-6.925h0a1.227,1.227,0,0,0,.272-.342.882.882,0,0,0,.1-.417,1,1,0,0,0-.373-.759L28.24,11.583A1.481,1.481,0,0,0,26.4,11.558Z"
                    transform="translate(-7.875 -11.252)"
                    fill="#0f0f0f"
                  />
                </svg>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod.
                </p>
              </div>
              <LinkButton to={"/register"} text={"Create your free Account"} />
            </div>
          </div>
          <div className="grid">
            <div className="grid-text">Exclusive Samples, Loops & More</div>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod.
            </p>
            <Link to={"/"} className="learn-more">
              Learn More
            </Link>
          </div>
          <div className="grid"></div>
          <div className="grid"></div>
          <div className="grid"></div>
          <div className="grid">
            <div className="grid-background"></div>
            <div className="grid-content">
              <div className="grid-6-text">Collab with fellow producers</div>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren.
              </p>
              <div>
                <Link to={"/register"} className="grid-link">
                  Start your musical journey now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
