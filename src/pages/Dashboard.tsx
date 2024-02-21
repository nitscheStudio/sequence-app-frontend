import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

//Image & Icon Imports
import profilePictureDefault from "../assets/profile-picture-default.svg";
import verifiedIcon from "../assets/verified-user-icon.svg";
import rankingIcon from "../assets/ranking-icon.svg";
import likesIcon from "../assets/likes-icon.svg";
import uploadIcon from "../assets/uploads-icon.svg";
import { LuLibrary } from "react-icons/lu";
import { TiHeartFullOutline } from "react-icons/ti";
import { MdCheckCircleOutline } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { BsCameraFill } from "react-icons/bs";

//Component Imports
import LikedSamplesList from "../components/LikedSamplesList";
import UploadedSamplesList from "../components/UploadedSamplesList";

// Packages Imports
import { Tooltip } from "react-tooltip";

//Context
import { AuthContext } from "../context/AuthProvider";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const { username, profile_picture_path } = auth;
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(
    location.pathname.includes("liked") ? "liked" : "uploaded"
  );
  const [showNotification, setShowNotification] = useState(false);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  let message = location.state?.message;
  const messageType = location.state?.messageType;

  const profilePictureUrl = `http://localhost/storage/${profile_picture_path}`;

  useEffect(() => {
    if (message) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      {showNotification && (
        <div className={`notification ${showNotification ? "show" : ""}`}>
          <p
            className={
              messageType === "success" ? "success-message" : "cancel-message"
            }
          >
            <span className="icon-text-container-message">
              {messageType === "success" ? (
                <MdCheckCircleOutline />
              ) : (
                <ImCancelCircle />
              )}
              {message}
            </span>
          </p>
        </div>
      )}

      <section className="profile-card">
        <div className="profile-picture-container">
          <img
            src={
              profile_picture_path ? profilePictureUrl : profilePictureDefault
            }
            alt="profile picture"
          />
          <Link to={"/edit/profile-picture"} className="edit-profile-picture">
            <div className="flex-col">
              <BsCameraFill className="edit-profile-picture-icon" />
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
              <p>Platinum</p>
            </div>
            <div className="stats-container">
              <img src={likesIcon} alt="likes icon" />
              <p>23 Likes</p>
            </div>
            <div className="stats-container">
              <img src={uploadIcon} alt="upload icon" />
              <p>{auth.samplesCount} Samples</p>
            </div>
          </div>
        </div>
      </section>
      <div>
        <section className="profile-card-2">
          <nav className="dashboard-sub-navigation">
            <ul className="sub-nav-items-container">
              <li
                data-tooltip-id="sample-library-tooltip"
                data-tooltip-content="Uploaded Samples"
                data-tooltip-delay-show={700}
                className="nav-item"
                onClick={() => handleTabChange("uploaded")}
              >
                <div className={activeTab === "uploaded" ? "active" : ""}>
                  <LuLibrary className="my-sample-library-icon" />
                </div>
              </li>
              <Tooltip id="sample-library-tooltip" />
              <li
                data-tooltip-id="liked-samples-tooltip"
                data-tooltip-content="Liked Samples"
                data-tooltip-delay-show={700}
                className="nav-item"
                onClick={() => handleTabChange("liked")}
              >
                <div className={activeTab === "liked" ? "active" : ""}>
                  <TiHeartFullOutline className="my-liked-samples-icon" />
                </div>
              </li>
              <Tooltip id="liked-samples-tooltip" />
            </ul>
          </nav>
        </section>

        <section className="sample-list-container">
          {activeTab === "uploaded" && <UploadedSamplesList />}
          {activeTab === "liked" && <LikedSamplesList />}
        </section>
      </div>
    </>
  );
};

export default Dashboard;
