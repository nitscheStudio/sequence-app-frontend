import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

import { useTheme } from "../context/ThemeManagment";

const ToggleDarkMode = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <>
      <button
        className={`toggle-dark-mode-btn ${isDarkMode ? "light-mode-btn" : ""}`}
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <CiLight /> : <MdDarkMode />}
      </button>
    </>
  );
};

export default ToggleDarkMode;
