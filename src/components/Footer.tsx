import React from "react";
import { FiInstagram } from "react-icons/fi";
import { ImSoundcloud } from "react-icons/im";
import { BsTwitterX } from "react-icons/bs";
import FooterLogo from "../assets/logo-footer.svg";
import { Link } from "react-router-dom";
import profileIcon from "../assets/profile-icon.svg";

const Footer = () => {
  return (
    <footer>
      <section className="upper-footer">
        <div className="upper-footer-column">
          <div className="profile-login-footer">
            <img src={profileIcon} alt="profile icon" />
            <div>My Account</div>
          </div>
          <div className="flex">
            <Link to={"/login"}>Login</Link>
            <div className="divider">/</div>
            <Link to={"/login"}>Sign up</Link>
          </div>
        </div>
        <div className="upper-footer-column right">
          <div className="suport-title">Support</div>
          <Link to={"/"}>Help</Link>
          <Link to={"/"}>Contact us</Link>
        </div>
      </section>
      <section className="middle-footer">
        <div className="container-footer">
          <Link to={"/"}>Imprint</Link>
          <div>•</div>
          <Link to={"/"}>Privacy Policy</Link>
          <div>•</div>
          <Link to={"/"}>Terms of Use</Link>
        </div>
      </section>
      <section className="lower-footer">
        <div className="container-footer">
          <img className="logo-footer" src={FooterLogo} alt="Sequence Logo" />
        </div>
        <div className="container-footer">© 2024 Sequence</div>
        <div className="container-footer">
          <div className="logo-container-footer">
            <FiInstagram />
            <ImSoundcloud />
            <BsTwitterX />
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
