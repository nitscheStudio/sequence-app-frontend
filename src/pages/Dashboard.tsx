import { AuthContext } from "../context/AuthProvider";
import { useContext, useRef, useState } from "react";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import { useEffect } from "react";

//Image & Icon Imports
import profilePictureDefault from "../assets/profile-picture-default.svg";
import verifiedIcon from "../assets/verified-user-icon.svg";
import rankingIcon from "../assets/ranking-icon.svg";
import likesIcon from "../assets/likes-icon.svg";
import uploadIcon from "../assets/uploads-icon.svg";
import { LuLibrary } from "react-icons/lu";
import { TiHeartFullOutline } from "react-icons/ti";

import { MdModeEdit } from "react-icons/md";

//Component Imports
import LikedSamplesList from "../components/LikedSamplesList";
import UploadedSamplesList from "../components/UploadedSamplesList";

// Packages Imports
import { Tooltip } from "react-tooltip";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const { username, profile_picture_path } = auth;
  const navigate = useNavigate();
  const location = useLocation();

  const message = location.state?.message;
  const messageType = location.state?.messageType;
  // console.log("location state:", location.state);

  useEffect(() => {
    navigate("uploaded");
    window.scrollTo(0, 0);
  }, [navigate]);

  const profilePictureUrl = `http://localhost/storage/${profile_picture_path}`;

  return (
    <>
      <section className="profile-card">
        <div className="profile-picture-container">
          {/* <img src={profilePicture} alt="profile picture" /> */}
          <img
            src={
              profile_picture_path ? profilePictureUrl : profilePictureDefault
            }
            alt="profile picture"
          />
          <Link to={"/edit/profile-picture"} className="edit-profile-picture">
            <div>
              <MdModeEdit className="edit-profile-picture-icon" />
              <span>Edit Profile Picture</span>
            </div>
          </Link>
        </div>

        <div className="profile-info">
          <h1 className="username">
            {username} <img src={verifiedIcon} alt="verified icon" />
          </h1>
          <div className="role">Producer</div>
          <div className="user-stats">
            <div className="stats-container">
              <img src={rankingIcon} alt="ranking icon" />
              <p>Top 0.1%</p>
            </div>
            <div className="stats-container">
              <img src={likesIcon} alt="likes icon" />
              <p>28 Likes</p>
            </div>
            <div className="stats-container">
              <img src={uploadIcon} alt="upload icon" />
              <p>34 Samples</p>
            </div>
          </div>
        </div>
      </section>
      {message && (
        <p
          className={
            messageType === "success" ? "success-message" : "cancel-message"
          }
        >
          {message}
        </p>
      )}
      <section className="profile-card-2">
        <nav className="dashboard-sub-navigation">
          <ul className="sub-nav-items-container">
            <li className="nav-item">
              <NavLink
                title="Uploaded Samples"
                to="uploaded"
                data-tooltip-id="sample-library-tooltip"
                data-tooltip-content="Uploaded Samples"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <LuLibrary className="my-sample-library-icon" />
              </NavLink>
              <Tooltip id="sample-library-tooltip" />
            </li>
            <li className="nav-item">
              <NavLink
                title="Liked SampleS"
                to="liked"
                data-tooltip-id="liked-samples-tooltip"
                data-tooltip-content="Liked Samples"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <TiHeartFullOutline className="my-liked-samples-icon" />
              </NavLink>
              <Tooltip id="liked-samples-tooltip" />
            </li>
          </ul>
        </nav>
      </section>
      <section className="sample-list-container">
        <Routes>
          <Route index element={<UploadedSamplesList />} />
          <Route path="uploaded" element={<UploadedSamplesList />} />
          <Route path="liked" element={<LikedSamplesList />} />
        </Routes>
      </section>
    </>
  );
};

export default Dashboard;
