import { MdOutlineMobileOff } from "react-icons/md";

const UploadPageMobileNotification = () => {
  return (
    <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
      <MdOutlineMobileOff size={68} />
      <h1>
        Sample Upload: <b>Desktop Only</b>
      </h1>
      <p>
        Our sample upload feature requires a desktop browser for the best
        experience. Please log in on a desktop or laptop to upload samples. We
        appreciate your understanding and look forward to your contributions!
      </p>
    </div>
  );
};

export default UploadPageMobileNotification;
