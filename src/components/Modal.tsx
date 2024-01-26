import React from "react";

interface ModalProps {
  isVisible: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  onExit: () => void;

  message: string | null;
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  title,
  content,
  onConfirm,
  onCancel,
  onExit,
  message,
}) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    if (dialogRef.current) {
      isVisible ? dialogRef.current.showModal() : dialogRef.current.close();
    }
  }, [isVisible]);

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-content">
        {message ? (
          <>
            <div className="message">{message}</div>
            <div className="modal-button-row">
              <button className="modal-button" onClick={onExit}>
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>{title}</h2>
            <p>{content}</p>
            <div className="modal-button-row">
              <button className="modal-button" onClick={onConfirm}>
                Confirm
              </button>
              <button className="modal-button" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

export default Modal;
