import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import http from "../utils/http";
import Modal from "./Modal";
import { MdPerson, MdDelete, MdExitToApp } from "react-icons/md";
import { useClickOutside } from "../customHooks/useClickOutside";
import { AuthContext, defaultAuth } from "../context/AuthProvider";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import profilePictureDefault from "../assets/profile-picture-default.svg";

const UserProfileContextMenu = () => {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const { setAuth, auth } = useContext(AuthContext);

  const profilePicturePath = auth.profile_picture_path;

  useClickOutside(menuRef, () => setIsMenuVisible(false));

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLogout = async () => {
    try {
      const response = await http.post("/logout");
      // Reset the auth state
      setAuth(defaultAuth);
      navigate("/login", { state: { logoutSuccessful: true } });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleDeleteAccount = () => {
    setModalTitle("Delete Account");
    setModalContent("Are you sure you want to delete your account?");
    setIsModalVisible(true);
  };

  const handleModalConfirm = async () => {
    await http.get("/sanctum/csrf-cookie");
    const response = await http.delete(`user/${auth.id}/delete`);
    setAuth(defaultAuth);
    setIsModalVisible(false);
    navigate("/register", { state: { userDeleteSuccessful: true } });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div ref={menuRef} className="context-menu-container">
      <button
        data-tooltip-id="profile-menu-tooltip"
        data-tooltip-content="Manage Profile"
        data-tooltip-delay-show={1800}
        onClick={toggleMenu}
        className="profile-menu-button"
        style={{
          backgroundImage: `url(${
            profilePicturePath
              ? `http://localhost/storage/${profilePicturePath}`
              : profilePictureDefault
          })`,
        }}
      ></button>

      <Tooltip id="profile-menu-tooltip" />
      {isMenuVisible && (
        <div className="context-menu">
          <Link
            className="border-bottom"
            to={"/edit/profile-picture"}
            onClick={(e) => {
              e.preventDefault();
              // Close the menu
              setIsMenuVisible(false);
              // Navigate programmatically
              navigate("/edit/profile-picture");
            }}
          >
            <MdPerson />
            Update Profile Picture
          </Link>
          <button onClick={handleDeleteAccount} className="context-menu-button">
            <MdDelete />
            Delete Account
          </button>
          <button
            onClick={handleLogout}
            className="context-menu-button border-top"
          >
            <MdExitToApp />
            Logout
          </button>
        </div>
      )}
      <Modal
        isVisible={isModalVisible}
        title={modalTitle}
        content={modalContent}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </div>
  );
};

export default UserProfileContextMenu;
