import { FaCheck } from "react-icons/fa6";
import { useState, useEffect } from "react";

type UserMessageProps = {
  message?: string;
};
const UserMessagePopup = ({ message }: UserMessageProps) => {
  return (
    <>
      <div className="user-message-popup">
        <div className="message-container">
          <FaCheck className="message-icon" />
          <p className="message-text ">{message}</p>
        </div>
      </div>
    </>
  );
};

export default UserMessagePopup;
