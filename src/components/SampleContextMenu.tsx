import React, { useState, useRef } from "react";

import { Link } from "react-router-dom";
import http from "../utils/http";

//Copmponent Imports
import Modal from "./Modal";

//Image & Icon Imports
import { MdMoreVert } from "react-icons/md";
import { MdModeEdit, MdDelete } from "react-icons/md";

//Library Imports (3rd Party)
import { Tooltip } from "react-tooltip";

// Custom Hooks
import { useClickOutside } from "../customHooks/useClickOutside";

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
      <button
        data-tooltip-id="sample-edit-tooltip"
        data-tooltip-content="Edit Sample"
        data-tooltip-delay-show={500}
        onClick={handleClick}
        className="context-menu-button-activate"
      >
        <MdMoreVert />
      </button>
      <Tooltip id="sample-edit-tooltip" />
      {isVisible && (
        <div className="context-menu">
          <Link
            className="border-bottom"
            onClick={() => window.scrollTo(0, 0)}
            to={`/edit/sample/${sampleId}`}
          >
            <MdModeEdit />
            Edit Sample
          </Link>
          <button
            onClick={handleDeleteClick}
            className="context-menu-button delete-sample-button"
          >
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
        message={message}
        onExit={handleExit}
      />
    </div>
  );
};

export default SampleContextMenu;
