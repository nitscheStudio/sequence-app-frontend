import React, { useState, useEffect, useRef } from "react";
import { useClickOutside } from "../customHooks/useClickOutside";
import { MdMoreVert } from "react-icons/md";
import { MdModeEdit, MdDelete } from "react-icons/md";
import Modal from "./Modal";
import { createPortal } from "react-dom";

import { Link } from "react-router-dom";
import http from "../utils/http";

type SampleContextMenuProps = {
  sampleId: number;
  isVisible: boolean;
  toggleVisibility: (id: number) => void;
  closeMenu: () => void;
  handleSampleDeletion: (deletedSampleId: number) => void;
};

const SampleContextMenu = ({
  sampleId,
  isVisible,
  toggleVisibility,
  closeMenu,
  handleSampleDeletion,
}: SampleContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [message, setMessage] = useState<string | null>(null);

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  // Custom Hook for closing the menu when clicking outside of it
  useClickOutside(menuRef, () => {
    if (isVisible) closeMenu();
  });

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsModalVisible(true); // Open the modal
  };

  //Modal functions

  const handleConfirm = async () => {
    try {
      console.log(sampleId);
      await http.get("/sanctum/csrf-cookie");
      const response = await http.delete(`/sample/delete/${sampleId}`);
      // console.log("response:", response);

      // If the deletion was successful, set the success message, else set error message

      if (response.status === 200) {
        setMessage("Sample successfully deleted");
      } else if (response.status === 403) {
        setMessage("You don't have permission to delete this sample");
      } else if (response.status === 404) {
        setMessage("Sample not found");
      } else if (response.status === 500) {
        setMessage("An error occured during deleting");
      }
    } catch (error) {
      console.error("An error occured during deleting", error);
    }

    closeMenu();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    closeMenu();
  };

  const handleExit = () => {
    handleSampleDeletion(sampleId);
    setIsModalVisible(false);
    closeMenu();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Stop propagate because of mousdown eventlistener on document;
    // Otherwise menu will close and immeditaley open again
    event.stopPropagation();
    toggleVisibility(sampleId);
  };

  return (
    <div ref={menuRef} className="context-menu-container">
      <button onClick={handleClick} className="context-menu-button-activate">
        <MdMoreVert />
      </button>
      {isVisible && (
        <div className="context-menu">
          <Link to={`/edit/sample/${sampleId}`}>
            <MdModeEdit />
            Edit Sample
          </Link>
          <button onClick={handleDeleteClick} className="context-menu-button">
            <MdDelete />
            Delete Sample
          </button>
        </div>
      )}
      <Modal
        isVisible={isModalVisible}
        title="Delete Sample"
        content="Are you sure you want to delete this sample?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        // onExit={handleExit}
        message={message}
        onExit={handleExit}
      />
    </div>
  );
};

export default SampleContextMenu;
