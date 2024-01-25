import React, { useState, useEffect, useRef } from "react";
import { useClickOutside } from "../customHooks/useClickOutside";
import { MdMoreVert } from "react-icons/md";
import { MdModeEdit, MdDelete } from "react-icons/md";
import Modal from "./Modal";

import { Link } from "react-router-dom";
import http from "../utils/http";

type SampleContextMenuProps = {
  sampleId: number;
  isVisible: boolean;
  toggleVisibility: (id: number) => void;
  closeMenu: () => void;
};

const SampleContextMenu = ({
  sampleId,
  isVisible,
  toggleVisibility,
  closeMenu,
}: SampleContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Custom Hook for closing the menu when clicking outside of it
  useClickOutside(menuRef, () => {
    if (isVisible) closeMenu();
  });

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("delete clicked");
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      console.log(sampleId);
      await http.get("/sanctum/csrf-cookie");
      const response = await http.delete(`/sample/delete/${sampleId}`);
      console.log("response:", response);

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

      // setShowDeleteModal(false);
      // closeMenu();
    } catch (error) {
      console.error("An error occured during deleting", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
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
          <Link to={"/edit"}>
            <MdModeEdit />
            Edit Sample
          </Link>
          <button onClick={handleDeleteClick} className="context-menu-button">
            <MdDelete />
            Delete Sample
          </button>
          <Modal
            isVisible={showDeleteModal}
            title="Delete Sample"
            content="Are you sure you want to delete this sample?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            message={message}
          ></Modal>
        </div>
      )}
    </div>
  );
};

export default SampleContextMenu;
