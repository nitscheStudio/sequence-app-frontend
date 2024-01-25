import React from "react";

interface ModalProps {
  isVisible: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  message: string | null;
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  title,
  content,
  onConfirm,
  onCancel,
  message,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <>
      {!message ? (
        <div className="modal">
          <div className="modal-content">
            <h2>{title}</h2>
            <p>{content}</p>
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="message">{message}</div>
      )}
    </>
  );
};

export default Modal;
