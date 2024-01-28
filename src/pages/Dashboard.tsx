import { AuthContext } from "../context/AuthProvider";
import { useContext, useRef } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

//Image & Icon Imports
import profilePicture from "../assets/profile-pic-template.png";
import verifiedIcon from "../assets/verified-user-icon.svg";
import rankingIcon from "../assets/ranking-icon.svg";
import likesIcon from "../assets/likes-icon.svg";
import uploadIcon from "../assets/uploads-icon.svg";

//Compoonent Imports
import LikedSamplesList from "../components/LikedSamplesList";
import UploadedSamplesList from "../components/UploadedSamplesList";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const { username } = auth;
  const navigate = useNavigate();
  // const { isSticky, setSticky } = useSticky();
  const ref = useRef(null);

  useEffect(() => {
    navigate("uploaded");
  }, [navigate]);

  return (
    <>
      {/* <div>
        <code>{JSON.stringify(auth)}</code>
      </div> */}
      <section className="profile-card">
        <div className="profile-picture-container">
          <img src={profilePicture} alt="profile picture" />
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
      <section className="profile-card-2">
        <nav className="dashboard-sub-navigation">
          <ul className="nav-items-container">
            <li className="nav-item">
              <NavLink
                to="uploaded"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                My Samples
              </NavLink>
              <NavLink
                to="liked"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Liked Samples
              </NavLink>
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
